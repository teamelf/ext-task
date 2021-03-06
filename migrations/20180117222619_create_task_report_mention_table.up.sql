CREATE TABLE task_report_mention (
  id VARCHAR(50) NOT NULL,
  report_id VARCHAR(50) DEFAULT NULL,
  task_id VARCHAR(50) DEFAULT NULL,
  process_id VARCHAR(50) DEFAULT NULL,
  member_id VARCHAR(50) DEFAULT NULL,
  prefix VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL,
  INDEX IDX_9EB252624BD2A4C0 (report_id),
  INDEX IDX_9EB252628DB60186 (task_id),
  INDEX IDX_9EB252627EC2F574 (process_id),
  INDEX IDX_9EB252627597D3FE (member_id),
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;

ALTER TABLE task_report_mention ADD CONSTRAINT FK_9EB252624BD2A4C0 FOREIGN KEY (report_id) REFERENCES task_report (id);
ALTER TABLE task_report_mention ADD CONSTRAINT FK_9EB252628DB60186 FOREIGN KEY (task_id) REFERENCES task (id);
ALTER TABLE task_report_mention ADD CONSTRAINT FK_9EB252627EC2F574 FOREIGN KEY (process_id) REFERENCES task_process (id);
ALTER TABLE task_report_mention ADD CONSTRAINT FK_9EB252627597D3FE FOREIGN KEY (member_id) REFERENCES member (id);
