var express = require('express');
var router = express.Router();

const defaultTechStack = {
    "stack": [
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
    ]
};

let currTechStack = defaultTechStack;

// GET Request - Send Tech Stack
router.get('/', function(req, res, next) {
    res.send(currTechStack);
});

// GET Request - Search Tech Stack
router.get('/:search', function(req, res, next) {
    const searchInput = req.params.search;
    filteredStack = [];
    for (let i = 0; i < currTechStack.stack.length; i++) {
        if (currTechStack.stack[i].name.includes(searchInput)) {
            filteredStack.push(currTechStack.stack[i]);
        }
    }
    res.send({
        "stack": filteredStack
    });
});

// POST Request - Add Tech to Stack
router.post('/:name/:exp/*', function(req, res, next) {
    const techImage = req.params[0];
    const techName = req.params.name;
    const techExp = req.params.exp;
    const newTech = {
        "name": techName,  
        "image": techImage,
        "exp": techExp
    };
    currTechStack.stack.push(newTech);
    res.send(currTechStack);
});

// DELETE Request - Delete Tech From Stack
router.delete('/:name', function(req, res, next) {
    const techName = req.params.name;
    let techIndex = -1;
    for (let i = 0; i < currTechStack.stack.length; i++) {
        if (currTechStack.stack[i].name === techName) {
            techIndex = i;
            break;
        }
    } 
    if (techIndex === -1) {
        throw new Error("Tech Not Found in Stack");
    } else {
        currTechStack.stack.splice(techIndex, 1);
        res.send(currTechStack);
    }
});

module.exports = router;