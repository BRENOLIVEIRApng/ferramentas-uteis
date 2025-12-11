 /**
 * ============================================================================
 * FERRAMENTAS APPLICATION - CLASSE PRINCIPAL
 * ============================================================================
 * 
 * @file        FerramentasApplication.java
 * @description Classe principal do Spring Boot que inicializa a aplicação
 *              e configura o contexto do servidor.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @package     com.ferramentas.ferramentas
 * 
 * ============================================================================
 * CONFIGURAÇÕES:
 * - Servidor Tomcat na porta 8080
 * - Context path: /api
 * - Auto-configuração Spring Boot
 * - Componente scan automático
 * 
 * ENDPOINTS BASE:
 * - http://localhost:8080/api
 * ============================================================================
 */

package com.ferramentas.ferramentas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FerramentasApplication {

	public static void main(String[] args) {
		SpringApplication.run(FerramentasApplication.class, args);
	}

}
