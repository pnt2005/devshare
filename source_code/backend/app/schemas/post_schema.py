from marshmallow import Schema, fields, validate

class PostSchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=5))
    content = fields.String(required=True)
    status = fields.String(validate=validate.OneOf(["draft", "published"]))
    tag = fields.List(fields.String(), required=False)