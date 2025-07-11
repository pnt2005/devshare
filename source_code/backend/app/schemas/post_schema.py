from marshmallow import Schema, fields, validate
from marshmallow import ValidationError

def not_blank(value):
    if not value.strip():
        raise ValidationError("password can not be blank")

class PostSchema(Schema):
    title = fields.String(required=True, validate=not_blank)
    content = fields.String(required=True, validate=not_blank)
    status = fields.String(validate=validate.OneOf(["draft", "published"]))
    tag = fields.List(fields.String(), required=False)