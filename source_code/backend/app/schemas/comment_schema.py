from marshmallow import Schema, fields, validate

class CommentSchema(Schema):
    content = fields.String(required=True, validate=validate.Length(min=1))
    parent_id = fields.Integer(required=False, allow_none=True)