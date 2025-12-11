/**
 * ============================================================================
 * DATE FORMATTTER - CONVERSOR DE DATAS PARA FORMATO BRASILEIRO
 * ============================================================================
 * 
 * @file        DateFormatter.java
 * @description Utilitário para conversão e validação de datas em diversos formatos
 *              para o formato brasileiro padrão (DD/MM/YYYY).    
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @package     com.ferramentas.ferramentas.util
 * @component   Spring Component
 * @requires    Java Time API
 * @requires    DateTimeFormatter
 * @requires    DateTimeParseException
 * 
 * ============================================================================
 * PROCESSAMENTOS REALIZADOS:
 * - Validação e limpeza de datas
 * - Conversão de datas para formato brasileiro (DD/MM/YYYY)
 * - Remoção de caracteres especiais perigosos
 * - Sanitização de campos conforme regras
 * 
 * CAMPOS PERMITIDOS COM ESPAÇOS:
 * - DIA, MÊS, ANO
 * 
 * SEGURANÇA:
 * - Remove aspas curvas e caracteres Unicode perigosos
 * - Sanitiza entrada para prevenir injeção de dados
 * ============================================================================
 */

package com.ferramentas.ferramentas.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class DateFormatter {

    private static final List<DateTimeFormatter> INPUT_FORMATTERS = Arrays.asList(
            DateTimeFormatter.ofPattern("M/d/yyyy"),
            DateTimeFormatter.ofPattern("MM/dd/yyyy"),
            DateTimeFormatter.ofPattern("d/M/yyyy"),
            DateTimeFormatter.ofPattern("dd/MM/yyyy"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("yyyy/MM/dd"),
            DateTimeFormatter.ofPattern("yyyyMMdd"),
            DateTimeFormatter.ofPattern("ddMMyyyy")
    );

    private static final DateTimeFormatter OUTPUT_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public String convertToBrazilianFormat(String dateString) {
        if (dateString == null || dateString.trim().isEmpty()) {
            throw new IllegalArgumentException("Data não pode estar vazia");
        }

        String cleanDate = dateString.trim().replaceAll("[^0-9/\\-.]", "");

        for (DateTimeFormatter formatter : INPUT_FORMATTERS) {
            try {
                LocalDate date = LocalDate.parse(cleanDate, formatter);
                return date.format(OUTPUT_FORMATTER);
            } catch (DateTimeParseException ignored) {
            }
        }

        throw new IllegalArgumentException("Formato de data não reconhecido: " + dateString);
    }

    public boolean isValidDate(String dateString) {
        try {
            convertToBrazilianFormat(dateString);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}