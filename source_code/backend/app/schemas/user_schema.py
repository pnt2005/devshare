from marshmallow import Schema, fields, validate
from marshmallow import ValidationError

def not_blank(value):
    if not value.strip():
        raise ValidationError("Không được để trống")
    
class RegisterSchema(Schema):
    name = fields.String(required=True, validate=not_blank)
    email = fields.Email(required=True, validate=not_blank)
    password = fields.String(required=True, validate=[validate.Length(min=6), not_blank])

class LoginSchema(Schema):
    email = fields.Email(required=True, validate=not_blank)
    password = fields.String(required=True, validate=not_blank)

class UserInfoSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    email = fields.Email()
