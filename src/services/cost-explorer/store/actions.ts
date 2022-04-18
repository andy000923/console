// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Action } from 'vuex';
import { SpaceConnector } from '@spaceone/console-core-lib/space-connector';
import ErrorHandler from '@/common/composables/error/errorHandler';
import { CostExplorerState } from '@/services/cost-explorer/store/type';

export const setDashboardList: Action<CostExplorerState, any> = async ({ commit, rootState }): Promise<void> => {
    const userId = rootState.user.userId;
    try {
        commit('setDashboardListLoading', true);
        const publicDashboardList = await SpaceConnector.client.costAnalysis.publicDashboard.list();
        const userDashboardList = await SpaceConnector.client.costAnalysis.userDashboard.list({
            user_id: userId,
        });
        commit('setPublicDashboard', publicDashboardList.results);
        commit('setUserDashboard', userDashboardList.results);
    } catch (e) {
        ErrorHandler.handleError(e);
        commit('setPublicDashboard', []);
        commit('setUserDashboard', []);
    } finally {
        commit('setDashboardListLoading', false);
    }
};

export const setHomeDashboard: Action<CostExplorerState, any> = ({ dispatch }, homeDashboardId: string) => {
    dispatch('settings/setItem', {
        key: 'homeDashboard',
        value: homeDashboardId,
        path: '/costExplorer',
    }, { root: true });
};