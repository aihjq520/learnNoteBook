## option 可控变量

```rust

fn getStoreName(os: &str) -> Option<&str> {
    match os {
        "IOS" =>  Some("AppStore"),
        "Android" => Some("GooglePlay"),
        _ => None
    }
}

```

## unwrap panic

有点像catch 和 throw Error