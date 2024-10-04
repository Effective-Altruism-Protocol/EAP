export const EAP_CONTRACT_ADDRESS = "0x5F0d37Da2678c08D86F2101220FF2B0514ED9846"; //AMOY
export const CONVERT_TOKENS_CONTRACT_ADDRESS = "";

export const EAP_ABI = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "alertMessage",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "message",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "remainingAmount",
            "type": "uint256"
          },
          {
            "internalType": "enum EAP.statusProject",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "changedName",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct EAP.Project",
        "name": "project",
        "type": "tuple"
      }
    ],
    "name": "projectWithdrawn",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ContributionsByProjects",
    "outputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "projectId",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "_foundationId",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_projectIndex",
        "type": "uint256"
      }
    ],
    "name": "addContribution",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_webUrl",
        "type": "string"
      },
      {
        "internalType": "enum EAP.CountriesCodeiso2",
        "name": "_country",
        "type": "uint8"
      },
      {
        "internalType": "string[]",
        "name": "_tags",
        "type": "string[]"
      }
    ],
    "name": "addFoundation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webUrl",
            "type": "string"
          },
          {
            "internalType": "enum EAP.CountriesCodeiso2",
            "name": "country",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "collected",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "tags",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Foundation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_goal",
        "type": "uint256"
      }
    ],
    "name": "addProject",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "name": "addressFoundationsById",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newName",
        "type": "string"
      }
    ],
    "name": "changeFoundationName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newName",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_projectId",
        "type": "int256"
      }
    ],
    "name": "changeProjectName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_usd",
        "type": "uint256"
      }
    ],
    "name": "convertUSDtoWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wei",
        "type": "uint256"
      }
    ],
    "name": "convertWeitoUSD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "donorsByAccounts",
    "outputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "foundations",
    "outputs": [
      {
        "internalType": "int256",
        "name": "id",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "webUrl",
        "type": "string"
      },
      {
        "internalType": "enum EAP.CountriesCodeiso2",
        "name": "country",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "collected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllFoundations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webUrl",
            "type": "string"
          },
          {
            "internalType": "enum EAP.CountriesCodeiso2",
            "name": "country",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "collected",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "tags",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Foundation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCountries",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDecimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getFoundationbyAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webUrl",
            "type": "string"
          },
          {
            "internalType": "enum EAP.CountriesCodeiso2",
            "name": "country",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "collected",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "tags",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Foundation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getFoundationbyId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webUrl",
            "type": "string"
          },
          {
            "internalType": "enum EAP.CountriesCodeiso2",
            "name": "country",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "collected",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "tags",
            "type": "string[]"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Foundation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPriceETHinUSD",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getProjectsbyAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "remainingAmount",
            "type": "uint256"
          },
          {
            "internalType": "enum EAP.statusProject",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "changedName",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Project[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "_id",
        "type": "int256"
      }
    ],
    "name": "getProjectsbyFoundationId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "id",
            "type": "int256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "remainingAmount",
            "type": "uint256"
          },
          {
            "internalType": "enum EAP.statusProject",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "changedName",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct EAP.Project[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "idFoundationByAccount",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "name": "projectById",
    "outputs": [
      {
        "internalType": "int256",
        "name": "id",
        "type": "int256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "remainingAmount",
        "type": "uint256"
      },
      {
        "internalType": "enum EAP.statusProject",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "changedName",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projectsByDonors",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projectsByIdFoundations",
    "outputs": [
      {
        "internalType": "int256",
        "name": "id",
        "type": "int256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "remainingAmount",
        "type": "uint256"
      },
      {
        "internalType": "enum EAP.statusProject",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "changedName",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectIndex",
        "type": "uint256"
      }
    ],
    "name": "withdrawProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const CONVERT_TOKENS_ABI = [];


export const countries = [
  {code: 'AF', name: 'Afghanistan'},
{code: 'AX', name: 'Åland Islands'},
{code: 'AL', name: 'Albania'},
{code: 'DZ', name: 'Algeria'},
{code: 'AS', name: 'American Samoa'},
{code: 'AD', name: 'Andorra'},
{code: 'AO', name: 'Angola'},
{code: 'AI', name: 'Anguilla'},
{code: 'AQ', name: 'Antarctica'},
{code: 'AG', name: 'Antigua and Barbuda'},
{code: 'AR', name: 'Argentina'},
{code: 'AM', name: 'Armenia'},
{code: 'AW', name: 'Aruba'},
{code: 'AU', name: 'Australia'},
{code: 'AT', name: 'Austria'},
{code: 'AZ', name: 'Azerbaijan'},
{code: 'BS', name: 'Bahamas'},
{code: 'BH', name: 'Bahrain'},
{code: 'BD', name: 'Bangladesh'},
{code: 'BB', name: 'Barbados'},
{code: 'BY', name: 'Belarus'},
{code: 'BE', name: 'Belgium'},
{code: 'BZ', name: 'Belize'},
{code: 'BJ', name: 'Benin'},
{code: 'BM', name: 'Bermuda'},
{code: 'BT', name: 'Bhutan'},
{code: 'BO', name: 'Bolivia (Plurinational State of)'},
{code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba'},
{code: 'BA', name: 'Bosnia and Herzegovina'},
{code: 'BW', name: 'Botswana'},
{code: 'BV', name: 'Bouvet Island'},
{code: 'BR', name: 'Brazil'},
{code: 'IO', name: 'British Indian Ocean Territory'},
{code: 'BN', name: 'Brunei Darussalam'},
{code: 'BG', name: 'Bulgaria'},
{code: 'BF', name: 'Burkina Faso'},
{code: 'BI', name: 'Burundi'},
{code: 'CV', name: 'Cabo Verde'},
{code: 'KH', name: 'Cambodia'},
{code: 'CM', name: 'Cameroon'},
{code: 'CA', name: 'Canada'},
{code: 'KY', name: 'Cayman Islands'},
{code: 'CF', name: 'Central African Republic'},
{code: 'TD', name: 'Chad'},
{code: 'CL', name: 'Chile'},
{code: 'CN', name: 'China'},
{code: 'CX', name: 'Christmas Island'},
{code: 'CC', name: 'Cocos (Keeling) Islands'},
{code: 'CO', name: 'Colombia'},
{code: 'KM', name: 'Comoros'},
{code: 'CG', name: 'Congo'},
{code: 'CD', name: 'Congo (Democratic Republic of the)'},
{code: 'CK', name: 'Cook Islands'},
{code: 'CR', name: 'Costa Rica'},
{code: 'CI', name: 'Côte d\'Ivoire'},
{code: 'HR', name: 'Croatia'},
{code: 'CU', name: 'Cuba'},
{code: 'CW', name: 'Curaçao'},
{code: 'CY', name: 'Cyprus'},
{code: 'CZ', name: 'Czech Republic'},
{code: 'DK', name: 'Denmark'},
{code: 'DJ', name: 'Djibouti'},
{code: 'DM', name: 'Dominica'},
{code: 'DO', name: 'Dominican Republic'},
{code: 'EC', name: 'Ecuador'},
{code: 'EG', name: 'Egypt'},
{code: 'SV', name: 'El Salvador'},
{code: 'GQ', name: 'Equatorial Guinea'},
{code: 'ER', name: 'Eritrea'},
{code: 'EE', name: 'Estonia'},
{code: 'ET', name: 'Ethiopia'},
{code: 'FK', name: 'Falkland Islands (Malvinas)'},
{code: 'FO', name: 'Faroe Islands'},
{code: 'FJ', name: 'Fiji (Republic of)'},
{code: 'FI', name: 'Finland'},
{code: 'FR', name: 'France'},
{code: 'GF', name: 'French Guiana'},
{code: 'PF', name: 'French Polynesia'},
{code: 'TF', name: 'French Southern Territories'},
{code: 'GA', name: 'Gabon'},
{code: 'GM', name: 'Gambia'},
{code: 'GE', name: 'Georgia'},
{code: 'DE', name: 'Germany'},
{code: 'GH', name: 'Ghana'},
{code: 'GI', name: 'Gibraltar'},
{code: 'GR', name: 'Greece'},
{code: 'GL', name: 'Greenland'},
{code: 'GD', name: 'Grenada'},
{code: 'GP', name: 'Guadeloupe'},
{code: 'GU', name: 'Guam'},
{code: 'GT', name: 'Guatemala'},
{code: 'GG', name: 'Guernsey'},
{code: 'GN', name: 'Guinea'},
{code: 'GW', name: 'Guinea-Bissau'},
{code: 'GY', name: 'Guyana'},
{code: 'HT', name: 'Haiti'},
{code: 'HM', name: 'Heard Island and McDonald Islands'},
{code: 'VA', name: 'Holy See'},
{code: 'HN', name: 'Honduras'},
{code: 'HK', name: 'Hong Kong'},
{code: 'HU', name: 'Hungary'},
{code: 'IS', name: 'Iceland'},
{code: 'IN', name: 'India'},
{code: 'ID', name: 'Indonesia'},
{code: 'IR', name: 'Iran (Islamic Republic of)'},
{code: 'IQ', name: 'Iraq'},
{code: 'IE', name: 'Ireland'},
{code: 'IM', name: 'Isle of Man'},
{code: 'IL', name: 'Israel'},
{code: 'IT', name: 'Italy'},
{code: 'JM', name: 'Jamaica'},
{code: 'JP', name: 'Japan'},
{code: 'JE', name: 'Jersey'},
{code: 'JO', name: 'Jordan'},
{code: 'KZ', name: 'Kazakhstan'},
{code: 'KE', name: 'Kenya'},
{code: 'KI', name: 'Kiribati'},
{code: 'KP', name: 'Korea (Democratic People\'s Republic of)'},
{code: 'KR', name: 'Korea (Republic of)'},
{code: 'KW', name: 'Kuwait'},
{code: 'KG', name: 'Kyrgyzstan'},
{code: 'LA', name: 'Lao People\'s Democratic Republic'},
{code: 'LV', name: 'Latvia'},
{code: 'LB', name: 'Lebanon'},
{code: 'LS', name: 'Lesotho'},
{code: 'LR', name: 'Liberia'},
{code: 'LY', name: 'Libya'},
{code: 'LI', name: 'Liechtenstein'},
{code: 'LT', name: 'Lithuania'},
{code: 'LU', name: 'Luxembourg'},
{code: 'MO', name: 'Macao'},
{code: 'MK', name: 'Macedonia (the former Yugoslav Republic of)'},
{code: 'MG', name: 'Madagascar'},
{code: 'MW', name: 'Malawi'},
{code: 'MY', name: 'Malaysia'},
{code: 'MV', name: 'Maldives'},
{code: 'ML', name: 'Mali'},
{code: 'MT', name: 'Malta'},
{code: 'MH', name: 'Marshall Islands'},
{code: 'MQ', name: 'Martinique'},
{code: 'MR', name: 'Mauritania'},
{code: 'MU', name: 'Mauritius'},
{code: 'YT', name: 'Mayotte'},
{code: 'MX', name: 'Mexico'},
{code: 'FM', name: 'Micronesia (Federated States of)'},
{code: 'MD', name: 'Moldova (Republic of)'},
{code: 'MC', name: 'Monaco'},
{code: 'MN', name: 'Mongolia'},
{code: 'ME', name: 'Montenegro'},
{code: 'MS', name: 'Montserrat'},
{code: 'MA', name: 'Morocco'},
{code: 'MZ', name: 'Mozambique'},
{code: 'MM', name: 'Myanmar'},
{code: 'NA', name: 'Namibia'},
{code: 'NR', name: 'Nauru'},
{code: 'NP', name: 'Nepal'},
{code: 'NL', name: 'Netherlands'},
{code: 'NC', name: 'New Caledonia'},
{code: 'NZ', name: 'New Zealand'},
{code: 'NI', name: 'Nicaragua'},
{code: 'NE', name: 'Niger'},
{code: 'NG', name: 'Nigeria'},
{code: 'NU', name: 'Niue'},
{code: 'NF', name: 'Norfolk Island'},
{code: 'MP', name: 'Northern Mariana Islands'},
{code: 'NO', name: 'Norway'},
{code: 'OM', name: 'Oman'},
{code: 'PK', name: 'Pakistan'},
{code: 'PW', name: 'Palau'},
{code: 'PS', name: 'Palestine, State of'},
{code: 'PA', name: 'Panama'},
{code: 'PG', name: 'Papua New Guinea'},
{code: 'PY', name: 'Paraguay'},
{code: 'PE', name: 'Peru'},
{code: 'PH', name: 'Philippines'},
{code: 'PN', name: 'Pitcairn'},
{code: 'PL', name: 'Poland'},
{code: 'PT', name: 'Portugal'},
{code: 'PR', name: 'Puerto Rico'},
{code: 'QA', name: 'Qatar'},
{code: 'RE', name: 'Réunion'},
{code: 'RO', name: 'Romania'},
{code: 'RU', name: 'Russian Federation'},
{code: 'RW', name: 'Rwanda'},
{code: 'BL', name: 'Saint Barthélemy'},
{code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha'},
{code: 'KN', name: 'Saint Kitts and Nevis'},
{code: 'LC', name: 'Saint Lucia'},
{code: 'MF', name: 'Saint Martin (French part)'},
{code: 'PM', name: 'Saint Pierre and Miquelon'},
{code: 'VC', name: 'Saint Vincent and the Grenadines'},
{code: 'WS', name: 'Samoa'},
{code: 'SM', name: 'San Marino'},
{code: 'ST', name: 'Sao Tome and Principe'},
{code: 'SA', name: 'Saudi Arabia'},
{code: 'SN', name: 'Senegal'},
{code: 'RS', name: 'Serbia'},
{code: 'SC', name: 'Seychelles'},
{code: 'SL', name: 'Sierra Leone'},
{code: 'SG', name: 'Singapore'},
{code: 'SX', name: 'Sint Maarten (Dutch part)'},
{code: 'SK', name: 'Slovakia'},
{code: 'SI', name: 'Slovenia'},
{code: 'SB', name: 'Solomon Islands'},
{code: 'SO', name: 'Somalia'},
{code: 'ZA', name: 'South Africa'},
{code: 'GS', name: 'South Georgia and the South Sandwich Islands'},
{code: 'SS', name: 'South Sudan'},
{code: 'ES', name: 'Spain'},
{code: 'LK', name: 'Sri Lanka'},
{code: 'SD', name: 'Sudan'},
{code: 'SR', name: 'Suriname'},
{code: 'SJ', name: 'Svalbard and Jan Mayen'},
{code: 'SZ', name: 'Swaziland'},
{code: 'SE', name: 'Sweden'},
{code: 'CH', name: 'Switzerland'},
{code: 'SY', name: 'Syrian Arab Republic'},
{code: 'TW', name: 'Taiwan, Province of China'},
{code: 'TJ', name: 'Tajikistan'},
{code: 'TZ', name: 'Tanzania, United Republic of'},
{code: 'TH', name: 'Thailand'},
{code: 'TL', name: 'Timor-Leste'},
{code: 'TG', name: 'Togo'},
{code: 'TK', name: 'Tokelau'},
{code: 'TO', name: 'Tonga'},
{code: 'TT', name: 'Trinidad and Tobago'},
{code: 'TN', name: 'Tunisia'},
{code: 'TR', name: 'Turkey'},
{code: 'TM', name: 'Turkmenistan'},
{code: 'TC', name: 'Turks and Caicos Islands'},
{code: 'TV', name: 'Tuvalu'},
{code: 'UG', name: 'Uganda'},
{code: 'UA', name: 'Ukraine'},
{code: 'AE', name: 'United Arab Emirates'},
{code: 'GB', name: 'United Kingdom of Great Britain and Northern Ireland'},
{code: 'US', name: 'United States of America'},
{code: 'UM', name: 'United States Minor Outlying Islands'},
{code: 'UY', name: 'Uruguay'},
{code: 'UZ', name: 'Uzbekistan'},
{code: 'VU', name: 'Vanuatu'},
{code: 'VE', name: 'Venezuela (Bolivarian Republic of)'},
{code: 'VN', name: 'Vietnam'},
{code: 'VG', name: 'Virgin Islands (British)'},
{code: 'VI', name: 'Virgin Islands (U.S.)'},
{code: 'WF', name: 'Wallis and Futuna'},
{code: 'EH', name: 'Western Sahara'},
{code: 'YE', name: 'Yemen'},
{code: 'ZM', name: 'Zambia'},
{code: 'ZW', name: 'Zimbabwe'}
];