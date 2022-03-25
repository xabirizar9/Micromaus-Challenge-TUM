package main

import (
	"io/ioutil"

	"go.uber.org/zap"
	"gopkg.in/yaml.v2"
)

type Config struct {
	MausAddr string `yaml:"mausAddr"`
}

func (c *Config) getConf() *Config {

	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Error("failed to read config", zap.Error(err))
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		log.Error("Unmarshal", zap.Error(err))
	}

	return c
}
