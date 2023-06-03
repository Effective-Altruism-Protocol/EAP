// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./utils/ConvertTokens.sol";

// esto es una prueba de git
/// @title A fundraising system for foundations
/// @author EAP Team

contract EAP is Ownable, ConvertTokens {
    /// @dev Total of the contributions.
    uint256 totalContributions = 0;
    /// @dev Balance of contract
    uint256 balance = 0;
    /// @dev
    enum countries {Venezuela, USA} 
    /// @dev
    enum statusProject {published, closed, withdrawn, paused, refunded}

    /// @dev Identifier for each foundation
    int256 private foundationId = 0;
    int256 private projectId = 1;


    /// @dev Foundations

    /// TODO Crear un hash con un ramdom de chainlink para identificar la pagina de la fundación creando un mapping
    struct Foundation {
        int256 id;
        string name;
        address account;
        string description;
        //string email;
        //countries country;
    }

    /// @dev Donors
    struct Donor {
        address account;
        uint256 balance;
    }

    /// @dev Contribution
    struct Contribution {
        address account;
        int256 projectId;
        uint256 amount; 
    }

    /// @dev Projects 
    struct Project {
        int256 id;
        address owner;
        string name;
        //uint256 foundationId;
        //string description;
        uint256 goal;
        uint256 balance; 
        uint256 remainingAmount;
        statusProject status;
        uint8 changedName;
    }

    Foundation[] public foundations; 

    /// @dev Register each foundation with an address and Ids
    mapping(address => int256) public idFoundationByAccount;

    /// @dev Assing foundation to foundationId.
    mapping(int256 => address) public addressFoundationsById;

    /// @dev Register donors account
    mapping(address => Donor) public donorsByAccounts;

    /// @dev Associate project to donor
    mapping(address => int256[]) public projectsByDonors;

    /// @dev Associate projects to foundations.id.
    mapping(int256 => Project[]) public projectsByIdFoundations;

    /// @dev Assing project to projectId.
    mapping(int256 => Project) public projectById;
    
    /// @dev Asociatte project.id to an array of contributions;
    mapping(int256 => Contribution[]) public ContributionsByProjects;

    /// @dev Verify address is not used when create new foundation;
    modifier addressUsed(address account) { 
        require(idFoundationByAccount[account] <= 0 , "Account assigned");
        _;
    }

    /// @dev Verify is foundation is registered before add project.
    modifier foundationExist(address account) { 
        require(idFoundationByAccount[account] > 0 , "Foundation doesn't exist");
        _;
    }

    modifier requireName(string memory name){
        require(bytes(name).length > 6, "Name must hve at least 6 characters" );
        _;
    }

    event alertMessage(string message);
    event message(string message);
    event projectWithdrawn(Project project); 

    /// @notice Constructor is needed only to make Payable
    constructor() payable ConvertTokens(0x98E5d0bd9c12dc9F846610092348619539331247){
        foundations.push(Foundation(0, "", address(0), ""));
        addressFoundationsById[foundationId] = address(0);
        idFoundationByAccount[address(0)] = foundationId;
        foundationId++;
    }
        
        /// @dev Add new foundation only if address has no one. 
        /// @param _name The Foundation's name.
        function addFoundation(
            string memory _name,
            string memory _description
             ) public 
             addressUsed(msg.sender)
             requireName(_name) 
             returns (Foundation memory) {
                idFoundationByAccount[msg.sender] = foundationId;
                addressFoundationsById[foundationId] = msg.sender;
                foundations.push(Foundation(foundationId, _name, msg.sender, _description));
                foundationId++;
                return foundations[uint256(foundationId-1)];
        }

        /// @param _account Address of a Foundation.
        /// @return Type Foundation corresponding to that address.
        function getFoundationbyAddress(address _account) public view returns(Foundation memory){
            Foundation memory foundation = foundations[uint(idFoundationByAccount[_account])];
            //if(keccak256(abi.encodePacked(foundation.name)) == keccak256(abi.encodePacked('EAP'))
         //       &&
        //        msg.sender != foundation.account) {
        //            return Foundation( -1, "" , address(0), "");
        //    }else{
                return foundation;
          //  }
        } 

        
        /// @return Type Foundation corresponding to that address.
        function getAllFoundations() public view returns(Foundation[] memory){
            return foundations;
            
        }

        /// @dev _id is the same that foundation.id
        /// @param _id Id of a foundation.
        /// @return Type Foundation corresponding to that address.
        function getFoundationbyId(uint256 _id) public view returns(Foundation memory){
            return foundations[_id];
        }

        /// @dev Get the projects of a foundation.
        /// @param _account Address of the foundation to get projects.
        /// @return Array of projects.
        function getProjectsbyAddress(address _account) public view returns(Project[] memory){
                        return projectsByIdFoundations[idFoundationByAccount[_account]];
        }


        /// @dev Get the projects of a foundation.
        /// @param _id ID of the foundation to get projects.
        /// @return Array of projects.
        function getProjectsbyFoundationId(int256 _id) public view returns(Project[] memory){
                        return projectsByIdFoundations[_id];
        }

        /// @dev Add new project to an existing foundation. Must be the owner foundation. 
        /// @param _name The Project Name.
        /// @param _goal The goal in ETH to reach. Will be in USD.
        function addProject(
            string memory _name, uint256 _goal
            ) public
            requireName(_name)  
            foundationExist(msg.sender) returns (int256){
            require( _goal > 0, "Must indicate a goal" );
            Project memory newProject = Project(
                projectId,
                msg.sender,
                _name,
                _goal,
                0,
                _goal,
                statusProject.published,
                0);
            projectsByIdFoundations[idFoundationByAccount[msg.sender]].push(newProject);
            projectById[projectId] = newProject;
            projectId++;
            return projectId - 1;
        }
    
        /// @dev Make a contribution to the indicated project. 
        /// @param _foundationId The Foundation Id.
        /// @param _projectIndex Index of project in projectByFoundations[].
        function addContribution(int256 _foundationId, uint256 _projectIndex) public payable{
            Project storage project = projectsByIdFoundations[_foundationId][_projectIndex];
            require(msg.sender != project.owner, "You can't contribute to your own project");
            //uint256 valueUSD = convertWeitoUSD(msg.value);
            require(project.remainingAmount >= msg.value, "Amount is higher than the remaining");
            project.balance += msg.value;
            project.remainingAmount -= msg.value;
            Contribution memory newContribution = Contribution(msg.sender, project.id, msg.value);
            ContributionsByProjects[project.id].push(newContribution);
            if(donorsByAccounts[msg.sender].account == address(0)){
                addDonor(msg.sender, msg.value);
            } 
            addProjectToDonor(msg.sender, project.id);
            //donor.balance += _amount;
            balance += msg.value;
        /// @dev verify is the goal is completed
            if(project.remainingAmount == 0) {
                project.status = statusProject.closed;
                emit message(string(abi.encodePacked("Project ", project.name, " reach goal.")));
            }
        }

        /// @dev Make a contribution to the indicated project. 
        /// @param _donorAccount Address of donor.
        /// @param _amount Contrinution amount.
        function addDonor(address _donorAccount, uint256 _amount) internal {
            Donor storage donor = donorsByAccounts[_donorAccount];
            donor.account = _donorAccount;
            donor.balance += _amount;
        }

        /// @dev Make a contribution to the indicated project. 
        /// @param _donorAccount Address of donor.
        /// @param _projectId Project Id.
        function addProjectToDonor(address _donorAccount, int256 _projectId) internal {
            projectsByDonors[_donorAccount].push(_projectId);
        }

        /// @dev Withdraw a reached goal project. 
        /// @param _projectIndex Index of project in projectByFoundations[] of the sender.
        function withdrawProject(uint256 _projectIndex) public foundationExist(msg.sender){
            Project storage projectToWithdraw = projectsByIdFoundations[idFoundationByAccount[msg.sender]][_projectIndex];
            require(msg.sender == projectToWithdraw.owner, "Project doesn't belong to you");
            require(projectToWithdraw.status == statusProject.closed, "Can't withdraw this projet. Goal not reached");
            bool withdrawSuccess = payable(projectToWithdraw.owner).send(projectToWithdraw.goal);
            if(withdrawSuccess){
                projectToWithdraw.status = statusProject.withdrawn;
                projectToWithdraw.balance = 0;
                emit projectWithdrawn(projectToWithdraw);
            }else{
                emit alertMessage("Error ocurred withdraw");
            } 
        }
        
        /// @dev to change Foundation Name. 
        /// @param _newName Index of project in projectByFoundations[] of the sender.
        function changeFoundationName(string memory _newName) public requireName(_newName)  {
            foundations[uint(idFoundationByAccount[msg.sender])].name = _newName;
        } 

        /// @dev To change Project Name. 
        /// @param _newName Index of project in projectByFoundations[] of the sender.
        /// @param _projectId Index of project in projectByFoundations[] of the sender.
        function changeProjectName(
            string memory _newName, 
            int256 _projectId) public
            requireName(_newName)  {
            require(projectById[_projectId].changedName <= 3, "Name has been changed too much");
            projectById[_projectId].name = _newName;
            projectById[_projectId].changedName ++;
        }

        //TODO change foundation address
        
}