pragma solidity ^0.5.0;

contract DappMedium{

    mapping(uint =>  string)contentHash;
    mapping(uint => address)contentWriter;
    uint public noOfarticle = 0;

    // function registerTowrite(address payable ad) public{
    //     writers[noOfwriters] = ad;
    //     noOfwriters++;
    // }

    constructor() payable public{

    }

    function noOfarticles() public returns(uint){
        return noOfarticle;
    }


    function addArticle(address owner, string memory articleHash) public{
        contentHash[noOfarticle] = articleHash;
        contentWriter[noOfarticle] = owner;
        noOfarticle++;
    }

    function getArticle(uint id) view public returns(string memory){
        return contentHash[id];
    }

    function getWriterAddress(uint id) view public returns(address){
        return contentWriter[id];
    }

    function transferToRead(address payable ad) payable public {
        ad.transfer(msg.value);
    }

    function walletBalance() view public returns(uint) {
        return address(this).balance;
    }
}
