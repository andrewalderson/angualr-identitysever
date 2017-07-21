import { ConfigurationService } from './configuration.service';

export function loadConfiguration(configurationService: ConfigurationService) {
    return () => configurationService.load();
}

export function getConfiguration(configurationService: ConfigurationService) {
    return configurationService.config;
}