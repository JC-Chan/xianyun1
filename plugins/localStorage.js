import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'stoer',  //读取本地存储的数据到 store
        })(store)
    })
}