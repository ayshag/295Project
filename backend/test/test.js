var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;


describe('/POST signin',()=> {
    it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/signin')
    .send({ "email": "aysha.yusufgodil@sjsu.edu", "password" : "pass"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });
})
})

describe('/POST signup',()=> {
    it("Should create account and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/signup')
    .send({ "fname": "Aysha", "lname": "Godil" , "email" : "aysha.yusufgodil@sjsu.edu", "password" : "pass", "mobile" : "+16504900749", "verified" :"true", "org_id" : 0})
    .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(err).to.be.null;
        done();
    });
})
})

describe('/PUT updatepassword',()=> { 
    it("Should update user password", function(done){ 
    chai.request('http://localhost:3001') 
    .put('/updatepassword') .send({ "user": "aysha.yusufgodil@sjsu.edu", "oldpassword" : "pass", "newpassword" : "password"}) 
    .end(function (err, res) { 
        expect(res).to.have.status(200); 
        expect(err).to.be.null;
        done();    
    }); 
}) 
})

describe('/GET threat-details',()=> { 
    it("Should get all threats", function(done){ 
    chai.request('http://localhost:3001') 
    .get('/threat-details') 
    .end(function (err, res) { 
        expect(res).to.have.status(200); 
        expect(err).to.be.null;
        done(); 
    }); 
}) 
})



describe('/POST classify',()=> { 
    it("Should classify", function(done){ 
    chai.request('http://localhost:3001') 
    .post('/classify') 
    .send({ "image_url": "https://vishbucket2.s3.amazonaws.com/image2.jpg"})
    .end(function (err, res) { 
        expect(res).to.have.status(200); 
        expect(err).to.be.null;
        done(); 
    }); 
}) 
})
