import {MigrationInterface, QueryRunner} from "typeorm";

export class initialRollout1568266948973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "member" ("id" character(28) NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "averageHeartRate" jsonb NOT NULL, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
