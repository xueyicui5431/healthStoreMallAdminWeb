import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            // opened: !+Cookies.get('sidebarStatus'),
            opened: !+localStorage.getItem("loginToken"),
            withoutAnimation: false
        },
        device: 'desktop'
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                localStorage.setItem("sidebarStatus", 1)
                    // Cookies.set('sidebarStatus', 1)

            } else {
                // Cookies.set('sidebarStatus', 0)
                localStorage.setItem("sidebarStatus", 0)

            }
            state.sidebar.opened = !state.sidebar.opened
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            // Cookies.set('sidebarStatus', 1)
            localStorage.setItem("sidebarStatus", 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        }
    },
    actions: {
        ToggleSideBar: ({
            commit
        }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({
            commit
        }, {
            withoutAnimation
        }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        ToggleDevice({
            commit
        }, device) {
            commit('TOGGLE_DEVICE', device)
        }
    }
}

export default app