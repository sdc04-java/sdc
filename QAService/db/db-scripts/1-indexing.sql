CREATE INDEX product_id_index ON sdc.questions (product_id, question_id);

CREATE INDEX question_id_index ON sdc.answers (question_id, answer_id);

CREATE INDEX answer_id_index ON sdc.photos (answer_id);
