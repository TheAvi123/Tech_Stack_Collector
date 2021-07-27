const Tech = require('../models/tech');
const { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();

const defaultTechStack = [
    {
        "name": "HTML", 
        "image": "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png",
        "exp": "Intermediate"
    },
    {
        "name": "CSS",  
        "image": "https://storage.needpix.com/rsynced_images/logo-2582747_1280.png",
        "exp": "Advanced"
    },
    {
        "name": "JavaScript",  
        "image": "https://purecode.sa/wp-content/uploads/two-4-1200x1200.png",
        "exp": "Expert"
    }
];

// let currTechStack = defaultTechStack;

// GET Request - Send Tech Stack
router.get('/', function(req, res, next) {
    // res.send(currTechStack);
    Tech.find().then((docs) => {
        console.log("Successfully get data from the DB.");
        console.log(docs);
        res.send({
            "stack": docs
        });
    }).catch((err) => {
        console.log("Failed to get data the DB.");
        console.log(err);
        throw new Error("Failed to get data the DB.");
    });
});

// GET Request - Search Tech Stack
router.get('/:search', function(req, res, next) {
    const searchInput = req.params.search;
    // filteredStack = [];
    // for (let i = 0; i < currTechStack.stack.length; i++) {
    //     if (currTechStack.stack[i].name.includes(searchInput)) {
    //         filteredStack.push(currTechStack.stack[i]);
    //     }
    // }
    // res.send({
    //     "stack": filteredStack
    // });
    Tech.find({
        name: { $regex: searchInput }
    }).then((docs) => {
        console.log("Successfully searched the DB.");
        console.log(docs);
        res.send({
            "stack": docs
        });
    }).catch((err) => {
        console.log("Failed to search the DB.");
        console.log(err);
        throw new Error("Failed to search the DB.");
    });
});

// POST Request - Add Tech to Stack
router.post('/:name/:exp/*', function(req, res, next) {
    const techImage = req.params[0];
    const techName = req.params.name;
    const techExp = req.params.exp;
    // const newTech = {
    //     "name": techName,  
    //     "image": techImage,
    //     "exp": techExp
    // };
    const newTech = new Tech({
        tech_id: uuidv4(),
        name: techName,
        image: techImage,
        exp: techExp
    })
    newTech.save().then((doc) => {
        console.log("Successfully added tech to DB.");
        console.log(doc);
        Tech.find().then((docs) => {
            res.send({
                "stack": docs
            });
        }).catch((err) => {
            throw new Error("Failed to get data from the DB (after addition).");
        });
    }).catch((err) => {
        console.log("Failed to add tech to DB.");
        console.log(err);
        throw new Error("Failed to add tech to DB.");
    });
    // res.send(currTechStack);
});

// DELETE Request - Delete Tech From Stack
router.delete('/:name', function(req, res, next) {
    const techName = req.params.name;
    // let techIndex = -1;
    // for (let i = 0; i < currTechStack.stack.length; i++) {
    //     if (currTechStack.stack[i].name === techName) {
    //         techIndex = i;
    //         break;
    //     }
    // } 
    // if (techIndex === -1) {
    //     throw new Error("Tech Not Found in Stack");
    // } else {
    //     currTechStack.stack.splice(techIndex, 1);
    //     res.send(currTechStack);
    // }
    Tech.deleteOne({
        name: techName
    }).then((del) => {
        console.log("Successfully removed tech from the DB.");
        console.log(del);
        Tech.find().then((docs) => {
            res.send({
                "stack": docs
            });
        }).catch((err) => {
            console.log("////////////////////////////");
            console.log(err);
            console.log("////////////////////////////");
            throw new Error("Failed to get data from the DB (after removal).");
        });
    }).catch((err) => {
        console.log("Failed to remove tech from the DB.");
        console.log(err);
        throw new Error("Failed to remove tech from the DB.");
    });
});

router.post('/reset', function(req, res, next) {
    Tech.deleteMany().then((del) => {
        console.log("Successfully cleared techs from DB.");
        console.log(del);
        let numAdded = 0;
        for (let i = 0; i < defaultTechStack.length; i++) {
            const newTech = new Tech({
                tech_id: uuidv4(),
                name: defaultTechStack[i].name,
                image: defaultTechStack[i].image,
                exp: defaultTechStack[i].exp
            })
            newTech.save().then((doc) => {
                console.log(`Successfully added default tech ${i} to DB.`);
                console.log(doc);
                numAdded++;
                if (numAdded == defaultTechStack.length) {
                    Tech.find().then((docs) => {
                        res.send({
                            "stack": docs
                        });
                    }).catch((err) => {
                        throw new Error("Failed to get data from the DB (after reset).");
                    });
                }
            }).catch((err) => {
                console.log(`Failed to add default tech ${i} to DB.`);
                console.log(err);
                throw new Error(`Failed to add default tech ${i} to DB.`);
            });
        }
    }).catch((err) => {
        console.log("Failed to remove techs (reset) from the DB.");
        console.log(err);
        throw new Error("Failed to remove techs (reset) from the DB.");
    });
    
});

module.exports = router;