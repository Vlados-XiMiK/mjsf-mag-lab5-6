<template>
  <v-app>
    <main>
      <v-container fluid fill-height class="loginOverlay mt-10">
        <v-row justify="center">
          <v-col cols="6" md="4" elevation-6>
            <v-card :disabled="loading"
                    elevation="4"
                    :loading="loading">
              <v-card-title class="primary white--text">{{ isLogin ? 'Login Form' : 'Register Form' }}</v-card-title>
              <v-card-text :loading="loading" class="pt-4">
                <div v-if="isLogin" class="col">
                  <v-form v-model="valid" ref="loginForm">
                    <v-text-field
                        label="Enter your e-mail address"
                        v-model="email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Enter your password"
                        v-model="password"
                        min="8"
                        :rules="passwordRules"
                        required
                        type="password"
                    ></v-text-field>
                  </v-form>
                </div>
                <div v-else>
                  <v-form v-model="valid" ref="registerForm">
                    <v-text-field
                        label="Enter your e-mail address"
                        v-model="registerEmail"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Enter your password"
                        v-model="registerPassword"
                        min="8"
                        :rules="passwordRules"
                        required
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        label="Confirm your password"
                        v-model="confirmPassword"
                        :rules="[v => v === registerPassword || 'Passwords do not match']"
                        required
                        type="password"
                    ></v-text-field>
                  </v-form>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-col class="text-center">
                    <v-btn width="120" :loading="loading" @click="isLogin ? submitLogin() : submitRegister()">
                      {{ isLogin ? 'Login' : 'Register' }}
                    </v-btn>
                    <v-btn width="120" class="ml-2 red white--text" @click="clear">Clear</v-btn>
                    <v-btn class="mt-2 ml-2" @click="resendVerificationEmail">Resend Verification Email</v-btn>
                  </v-col>
                </v-row>

              </v-card-actions>
              <v-card-actions>
                <v-row>
                  <v-col class="text-center">
                    <v-btn width="120" class="mt-2" @click="toggleForm">
                      {{ isLogin ? 'Register' : 'Login' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="message.show" :color="message.color" top>
          {{message.text}}
          <template v-slot:action>
            <v-btn class="white--text" text @click="message.show = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import firebase from '../../_firebase-init';
const auth = firebase.auth();
const db = firebase.firestore();

export default {
  name: "Login",
  data() {
    return {
      isLogin: true,
      message: {
        text: "Some text",
        show: false,
        color: "red"
      },
      loading: false,
      valid: false,
      email: '',
      password: '',
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        // eslint-disable-next-line no-useless-escape
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    async submitLogin() {
      this.loading = true;
      if (!this.$refs.loginForm.validate()) {
        this.loading = false;
        return;
      }
      try {
        const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password);
        const user = userCredential.user;
        if (!user.emailVerified) {
          // Если email не подтвержден, выводите сообщение об ошибке или предложите повторно отправить письмо для подтверждения
          throw new Error('Email is not verified. Please check your email for verification.');
        }
        this.$router.push("/home");
      } catch (e) {
        this.message.text = e.message;
        this.message.show = true;
        console.log(e);
      }
      this.loading = false;
    },

    async submitRegister() {
      this.loading = true;
      if (!this.$refs.registerForm.validate()) {
        this.loading = false;
        return;
      }
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(this.registerEmail, this.registerPassword);
        const user = userCredential.user;
        // Отправка подтверждения на электронную почту
        await user.sendEmailVerification();
        // Добавление данных в Firestore
        await db.collection('users').doc(user.uid).set({
          email: user.email,
          createdAt: new Date()
        });
        this.message.text = 'Registration successful. Please check your email for verification.';
        this.message.color = 'green';
        this.message.show = true;
        this.isLogin = true;
      } catch (e) {
        this.message.text = e.message;
        this.message.show = true;
        console.log(e);
      }
      this.loading = false;
    },

    async resendVerificationEmail() {
      try {
        const user = auth.currentUser;
        if (user) {
          // Повторная отправка письма для подтверждения адреса
          await user.sendEmailVerification();
          this.message.text = 'Verification email sent. Please check your email.';
          this.message.color = 'info'; // Используйте цвет для информационного сообщения
          this.message.show = true;
        } else {
          throw new Error('User not found. Please log in again.');
        }
      } catch (e) {
        this.message.text = e.message;
        this.message.show = true;
        console.error(e);
      }
    },

    clear() {
      this.$refs.loginForm.reset();
      if (this.$refs.registerForm) this.$refs.registerForm.reset();
    }
  },
}
</script>

<style scoped>

</style>
