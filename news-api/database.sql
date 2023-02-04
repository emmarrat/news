CREATE SCHEMA news COLLATE utf8mb3_general_ci;

USE news

CREATE TABLE news
(
    id       INT AUTO_INCREMENT,
    title    VARCHAR(100)           NOT NULL,
    content  VARCHAR(400)           NOT NULL,
    image    VARCHAR(100)           NULL,
    datetime DATETIME DEFAULT NOW() NULL,
    CONSTRAINT news_pk
        PRIMARY KEY (id)
);

CREATE TABLE comments
(
    id      INT AUTO_INCREMENT,
    news_id INT          NOT NULL,
    author  VARCHAR(100) NULL,
    text    VARCHAR(300) NOT NULL,
    CONSTRAINT comments_pk
        PRIMARY KEY (id),
    CONSTRAINT comments_news_id_fk
        FOREIGN KEY (news_id) REFERENCES news (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

INSERT INTO news (id, title, content) VALUES (1, 'hello world!', ' Hello, world! It is first thing what every developer writes as a code. So, today we are going to discuss and understand why we write this sentence');

INSERT INTO comments (id, news_id, author, text) VALUES (1, 1, 'dev journalist', 'I like this article!');


