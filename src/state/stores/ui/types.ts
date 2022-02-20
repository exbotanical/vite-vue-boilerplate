import type {
	RouteLocationNormalizedLoaded,
	RouteRecordName
} from 'vue-router';

export interface CacheState {
	cachedViews: RouteRecordName[];
}

export interface BaseState {}

export type UiState = BaseState & CacheState;

export type NamedRoute = Omit<RouteLocationNormalizedLoaded, 'name'> & {
	name: RouteRecordName;
};
