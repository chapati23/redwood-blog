import { UserInputError } from '@redwoodjs/api'

const validate = async (input) => {
  if (input.email && !input.email.match(/[^@]+@[^\.]+\..+/)) {
    throw new UserInputError("Can't create new contact", {
      messages: {
        email: ['is not formatted like an email address'],
      },
    })
  }

  if (await db.contact.findMany({ where: { email: input.email } })) {
    throw new UserInputError('Contact already exists, forgot your password?', {
      messages: {
        email: ['already exists in our database'],
      },
    })
  }
}

export const contacts = () => {
  return db.contact.findMany()
}

export const createContact = async ({ input }) => {
  await validate(input.email)
  return db.contact.create({ data: input })
}
