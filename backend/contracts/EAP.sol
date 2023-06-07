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
    enum CountriesCodeiso2 {AF,AL,DE,AD,AO,AI,AQ,AG,SA,DZ,AR,AM,AW,AU,AT,AZ,BE,BS,BH,BD,BB,BZ,BJ,BT,BY,MM,BO,BA,BW,BR,BN,BG,BF,BI,CV,KH,CM,CA,TD,CL,CN,CY,VA,CO,KM,CG,CD,KP,KR,CI,CR,HR,CU,CW,DK,DM,EC,EG,SV,AE,ER,SK,SI,ES,US,EE,ET,PH,FI,FJ,FR,GA,GM,GE,GH,GI,GD,GR,GL,GP,GU,GT,GF,GG,GN,GQ,GW,GY,HT,HN,HK,HU,IN,ID,IR,IQ,IE,BV,IM,CX,NF,IS,BM,KY,CC,CK,AX,FO,GS,HM,MV,FK,MP,MH,PN,SB,TC,UM,VG,VI,IL,IT,JM,JP,JE,JO,KZ,KE,KG,KI,KW,LB,LA,LS,LV,LR,LY,LI,LT,LU,MX,MC,MO,MK,MG,MY,MW,ML,MT,MA,MQ,MU,MR,YT,FM,MD,MN,ME,MS,MZ,NA,NR,NP,NI,NE,NG,NU,NO,NC,NZ,OM,NL,PK,PW,PS,PA,PG,PY,PE,PF,PL,PT,PR,QA,GB,CF,CZ,DO,SS,RE,RW,RO,RU,EH,WS,AS,BL,KN,SM,MF,PM,VC,SH,LC,ST,SN,RS,SC,SL,SG,SX,SY,SO,LK,ZA,SD,SE,CH,SR,SJ,SZ,TJ,TH,TW,TZ,IO,TF,TL,TG,TK,TO,TT,TN,TM,TR,TV,UA,UG,UY,UZ,VU,VE,VN,WF,YE,DJ,ZM,ZW} 
    

    string[] countries = ["AF","AL","DE","AD","AO","AI","AQ","AG","SA","DZ","AR","AM","AW","AU","AT","AZ","BE","BS","BH","BD","BB","BZ","BJ","BT","BY","MM","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","TD","CL","CN","CY","VA","CO","KM","CG","CD","KP","KR","CI","CR","HR","CU","CW","DK","DM","EC","EG","SV","AE","ER","SK","SI","ES","US","EE","ET","PH","FI","FJ","FR","GA","GM","GE","GH","GI","GD","GR","GL","GP","GU","GT","GF","GG","GN","GQ","GW","GY","HT","HN","HK","HU","IN","ID","IR","IQ","IE","BV","IM","CX","NF","IS","BM","KY","CC","CK","AX","FO","GS","HM","MV","FK","MP","MH","PN","SB","TC","UM","VG","VI","IL","IT","JM","JP","JE","JO","KZ","KE","KG","KI","KW","LB","LA","LS","LV","LR","LY","LI","LT","LU","MX","MC","MO","MK","MG","MY","MW","ML","MT","MA","MQ","MU","MR","YT","FM","MD","MN","ME","MS","MZ","NA","NR","NP","NI","NE","NG","NU","NO","NC","NZ","OM","NL","PK","PW","PS","PA","PG","PY","PE","PF","PL","PT","PR","QA","GB","CF","CZ","DO","SS","RE","RW","RO","RU","EH","WS","AS","BL","KN","SM","MF","PM","VC","SH","LC","ST","SN","RS","SC","SL","SG","SX","SY","SO","LK","ZA","SD","SE","CH","SR","SJ","SZ","TJ","TH","TW","TZ","IO","TF","TL","TG","TK","TO","TT","TN","TM","TR","TV","UA","UG","UY","UZ","VU","VE","VN","WF","YE","DJ","ZM","ZW"];
    
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
        string email;
        string webUrl;
        CountriesCodeiso2 country;
        uint256 collected;
        string[] tags;
        uint createdAt;
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
        uint createdAt;
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

    
    constructor() payable ConvertTokens(0x98E5d0bd9c12dc9F846610092348619539331247){
        foundations.push(Foundation(0, "", address(0), "", "", "", CountriesCodeiso2.VE, 0, new string[](0), 0));
        addressFoundationsById[foundationId] = address(0);
        idFoundationByAccount[address(0)] = foundationId;
        foundationId++;
    }
        
        /// @dev Add new foundation only if address has no one. 
        /// @param _name The Foundation's name.
        /// @param _description The Foundation's description.
        /// @param _email The Foundation's email.
        /// @param _webUrl The Foundation's web url.
        function addFoundation(
            string memory _name,
            string memory _description,
            string memory _email,
            string memory _webUrl,
            CountriesCodeiso2 _country,
            string[] memory _tags
             ) public 
             addressUsed(msg.sender)
             requireName(_name) 
             returns (Foundation memory) {
                idFoundationByAccount[msg.sender] = foundationId;
                addressFoundationsById[foundationId] = msg.sender;
                foundations.push(Foundation(
                                    foundationId,
                                    _name,
                                    msg.sender,
                                    _description,
                                    _email,
                                    _webUrl,
                                    _country,
                                    0, 
                                    _tags,
                                    block.timestamp));
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

        /// @return Type countruesCodeiso2
        function getCountries() public view returns(string[] memory){
            return countries;
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
                0,
                block.timestamp);
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
            foundations[uint(_foundationId)].collected += msg.value;
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
        //Create admins to foundations
        
}