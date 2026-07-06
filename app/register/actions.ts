export interface RegisterUserDetails {
  email: string;
  password: string;
  re_password: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}


export async function registerUser(userDetails: RegisterUserDetails): Promise<RegisterResponse> {
  try {
    const registerUrl = process.env.BACKEND_REGISTER_URL || process.env.NEXT_PUBLIC_BACKEND_REGISTER_URL;
    const response = await fetch(registerUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (response.status === 201) {
      return {
        success: true,
        message: "Registrierung erfolgreich! Bitte überprüfe deine E-Mails, um dein Konto zu aktivieren.",
      };
    } else {
      const errorData = await response.json();
      let errorMessage = "Registrierung fehlgeschlagen. Bitte versuche es erneut.";

      // Attempt to parse more specific error messages from API response
      if (errorData && typeof errorData === "object") {
        const fieldErrors = Object.entries(errorData)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(", ")}`;
            }
            return `${key}: ${String(value)}`;
          })
          .join("; ");
        if (fieldErrors) {
          errorMessage = fieldErrors;
        }
      }
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    return {
      success: false,
      message: "Ein Fehler ist aufgetreten. Bitte überprüfe deine Netzwerkverbindung oder versuche es später erneut.",
    };
  }
}
