import admin from 'firebase-admin'
import { Member } from '../entity/Member'
import { Trainer } from '../entity/Trainer'
import { getManager } from 'typeorm'

export async function addCustomClaims(): Promise<void> {
  const entityManager = getManager('default')
  const userEntities = [
    { entity: Member, type: 'member' },
    { entity: Trainer, type: 'trainer' },
  ]
  for (const entityMetadata of userEntities) {
    const users = await entityManager.find(entityMetadata.entity)
    for (const user of users) {
      await admin
        .auth()
        .setCustomUserClaims(user.id, { type: entityMetadata.type })
    }
  }
}
