import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const isLoading = ref(false)
  const user = ref([])
  const token = ref("")

  const setLoading = status =>  {
    isLoading.value = status
  }

  const setUserDetail = newUser => {
    user.value = newUser
  }

  return { isLoading, user, setLoading, setUserDetail }
})