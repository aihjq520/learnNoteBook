### LiveData
LiveData 是一种可观察的数据存储器类，与常规的Obserable类不同，LiveData 可感知应用组件（如 Activity、Fragment 或 Service）的生命周期。这种感知能力可确保 LiveData 仅更新处于活跃生命周期状态的应用组件观察者。
如果观察者（由 Observer 类表示）的生命周期处于 STARTED 或 RESUMED 状态，则 LiveData 会认为该观察者处于活跃状态。LiveData 只会将更新通知给活跃的观察者。为观察 LiveData 对象而注册的非活跃观察者不会收到更改通知。
可以与Lifecycle配合使用，当相应的 Lifecycle对象的状态变为 DESTROYED 时，便可移除此观察者，避免出现内存泄漏。
