CREATE TABLE task_process (
  id VARCHAR(50) NOT NULL,
  task_id VARCHAR(50) DEFAULT NULL,
  title VARCHAR(50) NOT NULL,
  description LONGTEXT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL,
  INDEX IDX_99FC327C8DB60186 (task_id),
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;

ALTER TABLE task_process ADD CONSTRAINT FK_99FC327C8DB60186 FOREIGN KEY (task_id) REFERENCES task (id);
