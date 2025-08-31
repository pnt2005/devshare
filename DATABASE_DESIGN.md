
# Database Design – DevShare Lite

## 🗃️ Database Type
Relational Database Management System: **PostgreSQL**.  

---

## 🔧Entity Relationship Diagram (ERD)
<img width="1209" height="707" alt="image" src="https://github.com/user-attachments/assets/208e7bb7-d15e-4261-a833-2e7522528f78" />

---

## 📑 Tables Explanation

### `user`
- `id` *(PK, Integer)* – User ID
- `name` *(String)* – Display name 
- `email` *(String)* – Email   
- `password` *(String)* – Encrypted password
- `avatar_url` *(String)* – Avatar image URL
- `created_at` *(Datetime)* – Account creation timestamp
  
---

### `post`
- `id` *(PK, Integer)* – Post ID 
- `user_id` *(FK → user.id)* – Post author
- `title` *(String)* – Post title
- `content` *(Text)* – Post content (Markdown)
- `is_published` *(Boolean)* – Publish status
- `created_at` *(Datetime)* – Created date 
- `updated_at` *(Datetime)* – Last updated date

---

### `comment`
- `id` *(PK, Integer)* – Comment ID
- `user_id` *(FK → user.id)* – Comment author 
- `post_id` *(FK → post.id)* – Associated post
- `parent_id` *(FK → comment.id, nullable)* – Associated post  
- `content` *(Text)* – Comment content
- `created_at` *(Datetime)* – Created date

---

### `tag`
- `id` *(PK, Integer)* – Tag ID  
- `name` *(String)* – Tag name

---

### `post_tag`
- `post_id` *(FK → post.id)* – Post ID 
- `tag_id` *(FK → tag.id)* – Tag ID
> *Composite Primary Key*  

---

### `like`
- `id` *(PK, Integer)* – Like ID
- `user_id` *(FK → user.id)* – User who liked
- `post_id` *(FK → post.id)* – Post liked
- `created_at` *(Datetime)* – Timestamp of like

---

### `comment_like`
- `id` *(PK, Integer)* – Comment like ID 
- `user_id` *(FK → user.id)* – User who liked 
- `comment_id` *(FK → comment.id)* – Comment liked
- `created_at` *(Datetime)* – Timestamp of like

---

### Table Relationships

- A `User`:
  - can create many `Posts`
  - can write many `Comments`
  - can like many `Posts` and `Comments`

- A `Post`:
  - belongs to a `User`
  - can have many `Comment`
  - can have many `Like` (can have many)
  - can have many `Tag` (many-to-many via `post_tag`)

- A `Comment`:
  - belongs to a `User`
  - belongs to a `Post`
  - can reply to another `Comment` (`parent_id`)
  - can have many `Like`

- A `Tag`:
  - can be linked to many `Post` through `post_tag`

- A `Like`:
  - belongs to a `User`
  - can represent a like for either a `Post` or a `Comment` (separated into two tables: `like` and `comment_like`)

- The `post_tag` table is a join table to establish the many-to-many relationship between `Post` and `Tag`.
