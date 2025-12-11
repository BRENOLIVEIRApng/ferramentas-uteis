/**
 * ============================================================================
 * GLOBAL EXCEPTION HANDLER - TRATAMENTO GLOBAL DE EXCEÇÕES
 * ============================================================================
 * 
 * @file        GlobalExceptionHandler.java
 * @description Manipulador global de exceções que captura e trata todos
 *              os erros da aplicação, retornando respostas padronizadas
 *              e amigáveis ao usuário.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     2025-12-03
 * @modified    2025-12-03
 * @version     2.0.0
 * 
 * @package     com.ferramentas.exception
 * @component   @RestControllerAdvice
 * @requires    Spring Web
 * @requires    SLF4J for logging
 * @requires    ApiResponse DTO
 * @requires    Custom Exceptions
 * @requires    HTTP Status Codes
 * @requires    Validation Framework
 * @requires    File Upload Handling
 * @requires    Exception Handling
 * @logger      SLF4J Logger
 * @handler     Multiple Exception Handlers
 * @response    Standardized API Responses
 * @status      Appropriate HTTP Status Codes
 * 
 * 
 * ============================================================================
 * EXCEÇÕES TRATADAS:
 * - InvalidCpfException           - CPF inválido (400)
 * - InvalidDateException          - Data inválida (400)
 * - FileProcessingException       - Erro ao processar arquivo (500)
 * - MaxUploadSizeExceededException - Arquivo muito grande (413)
 * - MethodArgumentNotValidException - Validação de entrada (400)
 * - Exception                     - Erro genérico (500)
 * 
 * LOGS:
 * - Todos os erros são logados com SLF4J
 * - Stack trace completo em modo DEBUG
 * - Informações sensíveis não são expostas ao cliente
 * 
 * RESPOSTA PADRÃO:
 * - Status HTTP apropriado
 * - Mensagem clara em português
 * - Estrutura ApiResponse padronizada
 * ============================================================================
 */

package com.ferramentas.ferramentas.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.ferramentas.ferramentas.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidCpfException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidCpfException(InvalidCpfException ex) {
        log.error("CPF inválido: {}", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(InvalidDateException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidDateException(InvalidDateException ex) {
        log.error("Data inválida: {}", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(FileProcessingException.class)
    public ResponseEntity<ApiResponse<Void>> handleFileProcessingException(FileProcessingException ex) {
        log.error("Erro ao processar arquivo: {}", ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException ex) {
        log.error("Arquivo muito grande: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ApiResponse.error("Arquivo muito grande. Tamanho máximo: 10MB"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        log.error("Erro de validação: {}", errors);
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error("Erro de validação", errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        log.error("Erro inesperado: {}", ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Erro interno do servidor"));
    }
}