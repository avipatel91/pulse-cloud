import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstSchema1569652210359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trainer" ("id" character(28) NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "email" character varying(50) NOT NULL, "heartRateRunningTotal" jsonb NOT NULL, "userType" character varying(15) NOT NULL, CONSTRAINT "PK_8dfa741df6d52a0da8ad93f0c7e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "sessionCode" character varying(10) NOT NULL, "name" character varying(25) NOT NULL, "trainerId" character(28), CONSTRAINT "UQ_4ecf9cff2d67534a0c2bf152855" UNIQUE ("sessionCode"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "member" ("id" character(28) NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "email" character varying(50) NOT NULL, "heartRateRunningTotal" jsonb NOT NULL, "userType" character varying(15) NOT NULL, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "member_sessions_session" ("memberId" character(28) NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_d26847a4484fee5709f0cbb7c74" PRIMARY KEY ("memberId", "sessionId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9044e262d2256d83d09fdddf8a" ON "member_sessions_session" ("memberId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_a6d08a90cffea9ab5fa8971b8f" ON "member_sessions_session" ("sessionId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_378f987b62f08cbabb7677ae258" FOREIGN KEY ("trainerId") REFERENCES "trainer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "member_sessions_session" ADD CONSTRAINT "FK_9044e262d2256d83d09fdddf8a7" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "member_sessions_session" ADD CONSTRAINT "FK_a6d08a90cffea9ab5fa8971b8f6" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_sessions_session" DROP CONSTRAINT "FK_a6d08a90cffea9ab5fa8971b8f6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "member_sessions_session" DROP CONSTRAINT "FK_9044e262d2256d83d09fdddf8a7"`,
    )
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_378f987b62f08cbabb7677ae258"`,
    )
    await queryRunner.query(`DROP INDEX "IDX_a6d08a90cffea9ab5fa8971b8f"`)
    await queryRunner.query(`DROP INDEX "IDX_9044e262d2256d83d09fdddf8a"`)
    await queryRunner.query(`DROP TABLE "member_sessions_session"`)
    await queryRunner.query(`DROP TABLE "member"`)
    await queryRunner.query(`DROP TABLE "session"`)
    await queryRunner.query(`DROP TABLE "trainer"`)
  }
}
