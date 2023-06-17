import fs from 'fs'
import yaml from 'yaml'
import type configType from '../types/config'

// 读取配置文件
try {
  fs.readFileSync('./config.yaml')
} catch (error) {
  // 没有配置文件，生成
  console.log('未找到配置文件，已自动生成')
  const defaultconfig = fs.readFileSync('./default_file/default_config.yaml', 'utf-8')
  // 写
  try {
    fs.writeFileSync('./config.yaml', defaultconfig, 'utf-8')
  } catch (error) {
    console.log('配置文件生成失败！')
  }
  process.exit()
}

// 有配置文件
const config = yaml.parse(fs.readFileSync('./config.yaml', 'utf-8')) as configType

export default config
