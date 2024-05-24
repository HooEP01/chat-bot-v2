package custom

type Response struct {
	StatusCode int         `json:"status_code"`
	Success    bool        `json:"success"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
}

func Success(data interface{}, message ...string) *Response {
	if len(message) == 0 {
		message = append(message, "")
	}

	return &Response{
		StatusCode: 200,
		Success:    true,
		Data:       data,
		Message:    message[0],
	}
}

func Fail(message string, code ...int) *Response {
	if len(code) == 0 {
		code = append(code, 500)
	}

	return &Response{
		StatusCode: code[0],
		Success:    false,
		Message:    message,
	}
}
