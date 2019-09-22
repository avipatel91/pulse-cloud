import {MigrationInterface, QueryRunner} from "typeorm";

export class MemberEntityRefactoring1568949216797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "member" RENAME COLUMN "averageHeartRate" TO "heartRates"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "member" RENAME COLUMN "heartRates" TO "averageHeartRate"`);
    }

}
