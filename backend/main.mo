import Text "mo:base/Text";

import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

actor Calculator {
  public func calculate(operation: Text, operand1: Float, operand2: Float) : async ?Float {
    switch (operation) {
      case ("+") { ?(operand1 + operand2) };
      case ("-") { ?(operand1 - operand2) };
      case ("*") { ?(operand1 * operand2) };
      case ("/") {
        if (operand2 == 0) {
          Debug.print("Error: Division by zero");
          null
        } else {
          ?(operand1 / operand2)
        }
      };
      case ("^") { ?(Float.pow(operand1, operand2)) };
      case (_) {
        Debug.print("Error: Invalid operation");
        null
      };
    }
  };
}