const express = require("express");
const router = express.Router();

const {
  GetAllCustomer,
  CustomerRegistration,
  CustomerLogin,
  UpdateCustomerById,
  GetCustomerById,
  DeleteCustomerById,
  BlockCustomerById,
  CustomerPasswordChange
} = require("../controllers/customer.controller");

/**
 * @openapi
 * '/api/v1/user/':
 *      get:
 *              tags:
 *              - User
 *              summary: Get all user's data
 *              responses:
 *                      200:
 *                              description: Success
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      404:
 *                              description: Users not found
 * 
 * '/api/v1/user/signup':
 *      post:
 *              tags:
 *              - User
 *              summary: Register an User
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: '#/components/schemas/UserInput'
 *              responses:
 *                      201:
 *                              description: Created
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      400:
 *                              description: Bad Request
 * 
 * '/api/v1/user/signin':
 *      post:
 *              tags:
 *              - User
 *              summary: Login an User
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              type: object
 *                                              required:
 *                                                      - email
 *                                                      - password
 *                                              properties:
 *                                                      email:
 *                                                              type: string
 *                                                              default: example@company.domain
 *                                                      password:
 *                                                              type: string
 *                                                              default: Example@10
 *              responses:
 *                      202:
 *                              description: Accepted
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: object
 *                      400:
 *                              description: Bad Request
 * 
 * '/api/v1/user/{id}':
 *      get:
 *              tags:
 *              - User
 *              summary: Get an user by id
 *              parameters:
 *                      - name: id
 *                        in: path
 *                        description: The user of id
 *                        required: true
 *              response:
 *                      200: 
 *                              description: Success
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      404:
 *                              description: Not Found
 *      patch:
 *              tags:
 *              - User
 *              summary: Update an user by id
 *              parameters:
 *                      - name: id
 *                        in: path
 *                        description: The user of id
 *                        required: true
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              type: object
 *                                              required:
 *                                                      - name
 *                                                      - contact_no
 *                                              properties:
 *                                                      name:
 *                                                              type: string
 *                                                              default: First-Middle-Last
 *                                                      contact_no:
 *                                                              type: number
 *                                                              default: 1234567890
 *              responses:
 *                      202:
 *                              description: Accepted
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      400:
 *                              description: Bad Request
 * 
 * '/api/v1/user/{id}/cif/{cif}':
 *      delete:
 *              tags:
 *              - User
 *              summary: Deactivate an user by id
 *              parameters:
 *                      - name: id
 *                        in: path
 *                        description: The user of id
 *                        required: true
 *                      - name: cif
 *                        in: path
 *                        description: Customer Identification Number
 *                        required: true
 *              responses:
 *                      202:
 *                              description: Accepted
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      400:
 *                              description: Bad Request
 *      patch:
 *              tags:
 *              - User
 *              summary: Change password of an user by id
 *              parameters:
 *                      - name: id
 *                        in: path
 *                        description: The user of id
 *                        required: true
 *                      - name: cif
 *                        in: path
 *                        description: Customer Identification Number
 *                        required: true
 *              requestBody:
 *                      required: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              type: object
 *                                              required:
 *                                                      - email
 *                                                      - password
 *                                              properties:
 *                                                      email:
 *                                                              type: string
 *                                                              default: First-Middle-Last
 *                                                      password:
 *                                                              type: string
 *                                                              default: Example@10
 *              responses:
 *                      202:
 *                              description: Accepted
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      $ref: '#/components/schemas/UserResponse'
 *                      400:
 *                              description: Bad Request
 */

router.route("/").get(GetAllCustomer);

router.route("/signup").post(CustomerRegistration);

router.route("/signin").post(CustomerLogin);

router.route("/:id").get(GetCustomerById).patch(UpdateCustomerById).delete(DeleteCustomerById);

router.route("/block/:id").get(BlockCustomerById);
router.route("/:id/cif/:cif").patch(CustomerPasswordChange)

module.exports = router;
