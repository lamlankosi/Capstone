import { createStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import { applyToken } from '@/service/AuthenticatedUser'
import router from '@/router'

const { cookies } = useCookies()
const APIUrl = "https://capstone-jq2s.onrender.com/"

applyToken(cookies.get('LegitUser')?.token)

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null,
    orders: null,
    order: null
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
    },
    setOrders(state, value) {
      state.orders = value
    },
    setOrder(state, value) {
      state.orders = value
    }
  },
  actions: {
    // Products
    async fetchProducts(context) {
      try {
        const res = await axios.get(`${APIUrl}products`)
        const { results, msg } = res.data;

        if (results) {
          context.commit('setProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
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
    async fetchProduct(context, id) {
      try {
        const res = await axios.get(`${APIUrl}products/${id}`)
        const { results, msg } = await res.data
        if (results) {
          context.commit('setProduct', results)
        } else {
          toast.error(`${msg}`, {
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
    async updateProduct(context, payload) {
      try {
        const { msg } = await (await axios.patch(`${APIUrl}products/${payload.id}`, payload.cred)).data;
        if (msg) {
          context.dispatch('fetchProducts');
          toast.success(`${msg}`, {
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

    // Users
    async fetchUsers(context) {
      try {
        const res = await axios.get(`${APIUrl}users`)
        const { results, msg } = await res.data
        if (results) {
          context.commit('setUsers', results)
        } else {
          toast.error(`${msg}`, {
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
    async fetchUser(context, id) {
      try {
        const { result, msg } = await (await axios.get(`${APIUrl}users/${id}`)).data;
        if (result) {
          context.commit('setUser', result);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    },    
    async registerUser(context, payload) {
      try {
        const res = await axios.post(`${APIUrl}users/signUp`, payload)
        const { msg, err, token } = await res.data;
        if (token) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          })
          cookies.set('LegitUser', token)
          applyToken(token)
          context.dispatch('fetchUser')
          router.push({ name: 'dashboard' })
        } else {
          toast.error(`${err}`, {
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
    async updateUser(context, payload) {
      try {
        const { msg, err } = await (await axios.patch(`${APIUrl}users/${payload.userID}`, payload.cred)).data;
    
        if (msg) {
          context.dispatch('fetchUser', payload.userID);
          toast.success(msg, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.error(err, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      }
    },    
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (await axios.delete(`${APIUrl}users/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
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
    async loginUser(context, payload) {
      try {
        const { msg, result, token } = await (await axios.post(`${APIUrl}users/signIn`, payload)).data;
        if (result) {
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
          context.commit('setUser', result);
          cookies.set('LegitUser', token);
          applyToken(token);
          return { user: result, token };
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
      return null;
    },



    // orders
    async fetchOrders(context){
      try {
        const res = await axios.get(`${APIUrl}orders`)
        const { results, msg } = res.data

        if (results) {
          context.commit('setOrders', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
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
    async fetchOrder(context, id){
      try {
        const res = await axios.get(`${APIUrl}orders/${id}`)
        const { result, msg } = res.data
        if (result) {
          context.commit('setOrder', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
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
    async addOrder(context, payload){
      try{
        const res = await axios.post(`${APIUrl}orders/add`, payload);
        const { result, msg } = res.data;
        if (result) {
          context.dispatch('fetchOrders');
          toast.success(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        });
      }
    },
    async deleteOrder(context,id){
      try {
        const {msg} = await  await (await axios.delete(`${APIUrl}orders/${id}`)).data
        if(msg) {
          context.dispatch('fetchOrders')
          toast.success(`${msg}`, {
            autoClose:2000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
          })
      }
    }
  },
  modules: {

  }
})
