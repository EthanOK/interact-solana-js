## Docs

https://www.quicknode.com/guides/solana-development/getting-started/a-complete-guide-to-airdropping-test-sol-on-solana

https://spl.solana.com/token

## 修改本地测试集群

```
solana config get

solana config set --url localhost

solana config set --url devnet
```

## 领取测试币

https://faucet.solana.com/

```
# devnet
solana airdrop 2 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH -u devnet

# testnet
solana airdrop 2 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH -u testnet

# localhost
solana airdrop 2 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH -u localhost
```

## 创建自定义账户

`solana-keygen grind --starts-with AQA:1`

## 读取帐户

`solana account 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH`

## 创建 FT

```
# Creating token
spl-token create-token

# 查询供应量
spl-token supply 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm

# 创建一个帐户来持有 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm 代币
spl-token create-account 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm

# 将 1000 个代币铸造到帐户中
spl-token mint 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm 1000

# 查询拥有的所有代币
spl-token accounts

# 转移token
spl-token transfer 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm 100 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH
or
spl-token transfer 3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm 100 3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH --fund-recipient
```

## 账户

```
第一种：由 KeyPair 直接控制的的账户（个人账户）
第一种：Token Account
第三种：Associated Token Account （个人账户持有某token之前需要先创建某token的关联token账户，一个token下只有一个Associated Account）

```
