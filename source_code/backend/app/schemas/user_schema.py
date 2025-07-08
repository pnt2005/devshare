from marshmallow import Schema, fields, validate

class RegisterSchema(Schema):
    name = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)

class UserInfoSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    email = fields.Email()
