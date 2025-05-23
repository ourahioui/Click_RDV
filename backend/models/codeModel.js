export default {
  async createOrUpdate(email, code, expiresAt) {
    return db('codes')
      .insert({
        email,
        code,
        expires_at: expiresAt
      })
      .onConflict('email')
      .merge();
  },

  async findByEmail(email) {
    return db('codes')
      .where('email', email)
      .first();
  },

  async deleteByEmail(email) {
    return db('codes')
      .where('email', email)
      .del();
  }
};