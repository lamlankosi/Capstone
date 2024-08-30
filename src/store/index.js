import { createStore } from 'vuex'
import {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import { applyToken } from '@/service/AuthenticatedUser'
import router from '@/router'
const {cookies} = useCookies()
const APIUrl = "https://capstone-jq2s.onrender.com/"

applyToken(cookies.get('LegitUser')?.token)
export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null

  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, value) {
      state.user = value
    },
    setProducts(state, value) {
      state.products = value
    },
    setProduct(state, value) {
      state.product = value
    }
  },
  actions: {
    // Products
    async fetchProducts(context) {
      try {
        const res = await axios.get(`${APIUrl}products/`)
        const {result, msg} = await res.data
        if (result) {
          context.commit('setProducts', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      }catch(e){
        toast.error(`${e.message}`,{
          autoClose: 2000
        })
      }
    },
    async fetchProduct(context, id) {
      try {
        const res = await axios.get(`${APIUrl}products/${id}`)
        const {result, msg} = await res.data
        if (result) {
          context.commit('setProducts', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      }catch(e){
        toast.error(`${e.message}`,{
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async addAProduct(context, payload) {
      try {
        const { msg } = await (await axios.post(`${APIUrl}products/add`, payload)).data
        if (msg) {
          context.dispatch('fetchProducts')
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async deleteProduct(context, id) {
      try {
        const { msg } = await (await axios.delete(`${APIUrl}products/${id}`)).data
        if (msg) {
          context.dispatch('fetchProducts')
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },

    //users
    async fetchUsers(context){
      try{
        const res = await axios.get(`${APIUrl}users/`)
        const {result, msg} = await res.data
        if(result){
          context.commit('setUsers', result)
          } else{
            toast.error(`${msg}`,{
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER
            })
          }
      } catch(e) {
        toast.error(`${e.message}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async fetchUser(context, id){
      try{
        const res = await axios.get(`${APIUrl}users/${id}`)
        const {result, msg} = await res.data
        if (result){
          context.commit('setUser', result)
          } else{
            toast.error(`${msg}`,{
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER
            }
          )
        }
      }  catch (e){
        toast.error(`${e.message}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async registerUser(context, payload) {
      try {
        const res = await axios.post(`${APIUrl}users/signUp`, payload);
        const { msg, err, token } = await res.data;
    // 'This email has already been taken, Login'
        if (token) {
          context.dispatch('fetchUsers');
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
          cookies.set('LegitUser', token); // Store the token in cookies
          applyToken(token); // Apply the token for future requests
          router.push({ name: 'dashboard' }); // Redirect to dashboard
        } else {
          toast.error(`${err}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      }
    },
    async updateUser(context, payload){
      try{
          const { msg, err } = await (await axios.patch(`${APIUrl}users/${payload.userID}`, payload)).data
  
        if(msg){
            context.dispatch('fetchUsers')
        } else {
            toast.error(`${err}`, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER
          })
        }
      } catch(e){
          toast.error(`${e.message}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async deleteUser(context, id) {
      try{
        const { msg, err } = await (await axios.delete(`${APIUrl}users/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch(e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        })
      }
    },
    async loginUser(context, payload) {
      try {
        const { msg, result, token } = await (await axios.post(`${APIUrl}users/signIn`, payload)).data;
    
        if (result) {
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
          context.commit('setUser', {
            msg,
            result
          });
          cookies.set('LegitUser', token)
          applyToken(token)
          router.push({ name: 'dashboard' })
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
    
    
  },
  modules: {
  }
})
