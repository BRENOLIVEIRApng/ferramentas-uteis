/**
 * ============================================================================
 * API RESPONSE - DTO PADRÃO DE RESPOSTA
 * ============================================================================
 * 
 * @file        ApiResponse.java
 * @description Data Transfer Object (DTO) padrão para todas as respostas
 *              da API REST, garantindo consistência e padronização.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @package     com.ferramentas.ferramentas.dto
 * 
 * @param       <T> Tipo genérico para o campo data
 * 
 * ============================================================================
 * ESTRUTURA JSON:
 * {
 *   "status": "success|error",
 *   "message": "Mensagem descritiva",
 *   "data": { ... },
 *   "errors": { ... }
 * }
 * 
 * MÉTODOS FACTORY:
 * - success(T data)               - Resposta de sucesso simples
 * - success(String msg, T data)   - Resposta de sucesso com mensagem
 * - error(String msg)             - Resposta de erro
 * - error(String msg, Object err) - Resposta de erro com detalhes
 * ============================================================================
 */

package com.ferramentas.ferramentas.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonInclude;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;
    private Object errors;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .status("success")
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .status("success")
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .status("error")
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(String message, Object errors) {
        return ApiResponse.<T>builder()
                .status("error")
                .message(message)
                .errors(errors)
                .build();
    }
}