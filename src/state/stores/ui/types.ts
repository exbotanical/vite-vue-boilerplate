import type {
	RouteLocationNormalizedLoaded,
	RouteRecordName
} from 'vue-router';

export interface IUiCacheState {
	cachedViews: RouteRecordName[];
}

export interface IUiBaseState {}

export type IUiState = IUiBaseState & IUiCacheState;

export type INamedRoute = Omit<RouteLocationNormalizedLoaded, 'name'> & {
	name: RouteRecordName;
};
