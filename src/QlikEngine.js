/*
    Objeto de configuração padrão para Qlik Cloud
        {
            host: 'grupoitg-nordica.us.qlikcloud.com',
            prefix: '/',
            port: 443,
            isSecure: true,
            webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli'
        }
     Instruções:
    Utilize o método connectQCS para conectar-se à Qlik Cloud, utilizando o objeto acima.

    Objeto de configuração padrão para o Qlik Enterprise


        {
            host: 'qspoc.nordica.net.br',
            prefix: '/',
            port: 443,
            isSecure: true
        }        
    Instruções:
    Utilize o método connectQSE para conectar-se à Qlik Enterprise, utilizando o objeto acima.
   
*/

const engine = {

    connectQCS: (config) => new Promise((resolve) => {
        const tenantUri = `https://${config.host}`;

        engine.request(
            config,
            tenantUri,
            '/api/v1/users/me'
        ).then((user) => {
            console.log(`Logged in, ${user.name}`);
            engine.loadCapSAAS(config).then(() => {
                window.requirejs.config({
                    webIntegrationId: config.webIntegrationId,
                    baseUrl: `${tenantUri}${config.prefix}resources`
                });

                window.requirejs(['js/qlik'], (qlik) => {
                    resolve(qlik);
                });
            });
        }, () => {
            console.log('Redirecting to Qlik Cloud...');
            const returnTo = encodeURIComponent(window.location.href);
            window.location.href = `${tenantUri}/login?returnto=${returnTo}&qlik-web-integration-id=${config.webIntegrationId}`;
        });
    }),

    connectQSE: (config) => new Promise((resolve) => {
        engine.loadCapabilityApis(config).then(() => {
            const protocol = config.isSecure ? 'https://' : 'http://';
            const port = config.port ? `:${config.port}` : '';
            window.requirejs.config({
                baseUrl: `${protocol}${config.host}${port}${config.prefix}resources`
            });
            window.requirejs(['js/qlik'], (qlik) => resolve(qlik));
        });
    }),

    loadCapSAAS: async (config) => {
        try {
            const tenantUrl = config.host;
            const { webIntegrationId } = config;

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://${tenantUrl}/resources/autogenerated/qlik-styles.css`;
            document.head.appendChild(link);
            link.loaded = new Promise((resolve) => {
                link.onload = () => {
                    resolve();
                };
            });

            const script = document.createElement('script');
            script.src = `https://${tenantUrl}/resources/assets/external/requirejs/require.js`;
            script.onload = async () => {
                window.require.config({
                    baseUrl: `https://${tenantUrl}/resources`,
                    webIntegrationId
                });
            };
            
            document.body.appendChild(script);
            script.loaded = new Promise((resolve) => {
                script.onload = () => {
                    resolve();
                };
            });

            await Promise.all([link.loaded, script.loaded]);
        } catch (error) {
            throw new Error(error);
        }
    },

    loadCapabilityApis: async (config) => {
        try {
            const capabilityApisJS = document.createElement('script');
            const { prefix } = config;
            const protocol = config.isSecure ? 'https://' : 'http://';
            const port = config.port ? `:${config.port}` : '';
            const baseUrl = `${protocol}${config.host}${port}${prefix}`;

            capabilityApisJS.src = `${baseUrl}resources/assets/external/requirejs/require.js`;
            document.head.appendChild(capabilityApisJS);
            capabilityApisJS.loaded = new Promise((resolve) => {
                capabilityApisJS.onload = () => {
                    resolve();
                };
            });
            const capabilityApisCSS = document.createElement('link');
            capabilityApisCSS.href = `${baseUrl}resources/autogenerated/qlik-styles.css`;
            capabilityApisCSS.type = 'text/css';
            capabilityApisCSS.rel = 'stylesheet';
            document.head.appendChild(capabilityApisCSS);
            capabilityApisCSS.loaded = new Promise((resolve) => {
                capabilityApisCSS.onload = () => {
                    resolve();
                };
            });

            await Promise.all([
                capabilityApisJS.loaded,
                capabilityApisCSS.loaded
            ]);
        } catch (error) {
            throw new Error(error);
        }
    },
    
    request: (config, tenantUri, path, returnJson = true) => new Promise((resolve, reject) => {
        fetch(`${tenantUri}${path}`, {
            mode: 'cors',
            credentials: 'include',
            redirect: 'follow',
            headers: {
                'qlik-web-integration-id': config.webIntegrationId
            }
        }).then((res) => {
            if (res.status < 200 || res.status >= 400) reject(res);
            return returnJson ? resolve(res.json()) : resolve(res);
        }, (err) => { reject(err); });
    })
};

export default engine;