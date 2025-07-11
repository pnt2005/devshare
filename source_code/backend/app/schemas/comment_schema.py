from marshmallow import Schema, fields, validate
from marshmallow import ValidationError

def not_blank(value):
    if not value.strip():
        raise ValidationError("Không được để trống")
    
class CommentSchema(Schema):
    content = fields.String(required=True, validate=not_blank)
    parent_id = fields.Integer(required=False, allow_none=True)