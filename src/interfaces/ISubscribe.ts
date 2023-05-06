export interface ISubscribe {
  subscriptionData: PushSubscription;
  payload?: Record<string, unknown> | null;
}
