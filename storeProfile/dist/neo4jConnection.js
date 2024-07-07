"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const app = (0, express_1.default)();
const port = 4000;
const driver = neo4j_driver_1.default.driver("neo4j+s://ea94a48f.databases.neo4j.io", neo4j_driver_1.default.auth.basic("neo4j", "sG8jKwphp4ymqMXe-JBv5sX1dKAJgDOEFZBR78lhVZU"));
app.use(body_parser_1.default.json());
app.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const session = driver.session();
    try {
        const result = yield session.run("CREATE (m:Movie {title: $title}) RETURN m", { title });
        const movie = result.records[0].get('m').properties;
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    finally {
        yield session.close();
    }
}));
app.post('/actors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const session = driver.session();
    try {
        const result = yield session.run("CREATE (a:Actor {name: $name}) RETURN a", { name });
        const actor = result.records[0].get('a').properties;
        res.status(201).json(actor);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    finally {
        yield session.close();
    }
}));
app.post('/addActorToMovie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieTitle, actorName } = req.body;
    const session = driver.session();
    try {
        const result = yield session.run(`
      MATCH (m:Movie {title: $movieTitle})
      MATCH (a:Actor {name: $actorName})
      CREATE (a)-[:ACTED_IN]->(m)
      RETURN m
      `, { movieTitle, actorName });
        const movie = result.records[0].get('m').properties;
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    finally {
        yield session.close();
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
