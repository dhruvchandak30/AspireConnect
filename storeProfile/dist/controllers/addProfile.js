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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProfileController = void 0;
const client_1 = require("@apollo/client");
// Initialize Apollo Client
const client = new client_1.ApolloClient({
    uri: 'https://your-graphql-endpoint',
    cache: new client_1.InMemoryCache()
});
// GraphQL mutation to create a user profile
const CREATE_USER_MUTATION = (0, client_1.gql) `
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
    $age: Int!
    $gender: String!
    $S3: String!
    $bio: String
    $journey: String
    $location: String
    $interests: [String]!
    $insta: String
    $twitter: String
    $linkedin: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      email: $email
      age: $age
      gender: $gender
      S3: $S3
      bio: $bio
      journey: $journey
      location: $location
      interests: $interests
      insta: $insta
      twitter: $twitter
      linkedin: $linkedin
    ) {
      UserId
      firstName
      lastName
    }
  }
`;
// Function to generate a dummy user profile
function generateDummyUser() {
    const randomFirstName = ['John', 'Jane', 'Michael', 'Emily'][Math.floor(Math.random() * 4)];
    const randomLastName = ['Doe', 'Smith', 'Johnson', 'Williams'][Math.floor(Math.random() * 4)];
    const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;
    const randomAge = Math.floor(Math.random() * (50 - 20) + 20); // Random age between 20 and 50
    const randomGender = Math.random() < 0.5 ? 'Male' : 'Female';
    const randomS3 = `s3://user-profiles/${Math.random().toString(36).substring(7)}.jpg`;
    const randomBio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const randomJourney = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const randomLocation = ['New York', 'Los Angeles', 'London', 'Berlin'][Math.floor(Math.random() * 4)];
    const randomInterests = ['music', 'sports', 'reading', 'coding'].sort(() => 0.5 - Math.random()).slice(0, 3);
    const randomInsta = `@${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}`;
    const randomTwitter = `@${randomFirstName.toLowerCase()}${randomLastName.toLowerCase()}`;
    const randomLinkedin = `${randomFirstName.toLowerCase()}-${randomLastName.toLowerCase()}`;
    return {
        firstName: randomFirstName,
        lastName: randomLastName,
        password: 'password123',
        email: randomEmail,
        age: randomAge,
        gender: randomGender,
        S3: randomS3,
        bio: randomBio,
        journey: randomJourney,
        location: randomLocation,
        interests: randomInterests,
        insta: randomInsta,
        twitter: randomTwitter,
        linkedin: randomLinkedin
    };
}
// Express controller function to add a dummy user profile
function addProfileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate a dummy user profile
            const user = generateDummyUser();
            // Variables for GraphQL mutation
            const variables = {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                email: user.email,
                age: user.age,
                gender: user.gender,
                S3: user.S3,
                bio: user.bio,
                journey: user.journey,
                location: user.location,
                interests: user.interests,
                insta: user.insta,
                twitter: user.twitter,
                linkedin: user.linkedin
            };
            // Send GraphQL mutation request
            const { data } = yield client.mutate({
                mutation: CREATE_USER_MUTATION,
                variables
            });
            // Respond with success message
            res.status(200).json({
                message: 'Dummy user profile added successfully',
                user: data.createUser
            });
        }
        catch (error) {
            // Handle errors
            console.error('Error adding user profile:', error);
            res.status(500).json({ error: 'Failed to add user profile' });
        }
    });
}
exports.addProfileController = addProfileController;
