"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Oflinecource_1 = require("../controllers/Oflinecource");
const oflinecourcesrouter = (0, express_1.Router)();
oflinecourcesrouter.get('/get/:id', Oflinecource_1.getoneoflinecource);
oflinecourcesrouter.get('/gat/all', Oflinecource_1.getalloflinecources);
oflinecourcesrouter.post('/new', Oflinecource_1.Regiteroflinecource);
oflinecourcesrouter.put('/update/:id', Oflinecource_1.updateoflinecource);
oflinecourcesrouter.delete('/delete/:id', Oflinecource_1.deleteoflinecource);
exports.default = oflinecourcesrouter;
