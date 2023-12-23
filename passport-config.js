const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    username: 'tuUsuario',
    password: '$2b$10$kh64fCCt4/nbYFQz3eDdC.5fMWONghZbok9YptMZDV/lImO/JEsYu', // Contraseña cifrada
  },
];

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
  const user = users.find((u) => u.username === username);
  if (!user) return done(null, false, { message: 'Usuario no encontrado' });

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

module.exports = passport;
