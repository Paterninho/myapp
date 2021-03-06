/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var mysqlx_pb = require('./mysqlx_pb.js');
var mysqlx_prepare_pb = require('./mysqlx_prepare_pb.js');
goog.exportSymbol('proto.Mysqlx.Cursor.Close', null, global);
goog.exportSymbol('proto.Mysqlx.Cursor.Fetch', null, global);
goog.exportSymbol('proto.Mysqlx.Cursor.Open', null, global);
goog.exportSymbol('proto.Mysqlx.Cursor.Open.OneOfMessage', null, global);
goog.exportSymbol('proto.Mysqlx.Cursor.Open.OneOfMessage.Type', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Cursor.Open = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Cursor.Open, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Cursor.Open.displayName = 'proto.Mysqlx.Cursor.Open';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Cursor.Open.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Cursor.Open.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Cursor.Open} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Open.toObject = function(includeInstance, msg) {
  var f, obj = {
    cursorId: jspb.Message.getField(msg, 1),
    stmt: (f = msg.getStmt()) && proto.Mysqlx.Cursor.Open.OneOfMessage.toObject(includeInstance, f),
    fetchRows: jspb.Message.getField(msg, 5)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Cursor.Open}
 */
proto.Mysqlx.Cursor.Open.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Cursor.Open;
  return proto.Mysqlx.Cursor.Open.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Cursor.Open} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Cursor.Open}
 */
proto.Mysqlx.Cursor.Open.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCursorId(value);
      break;
    case 4:
      var value = new proto.Mysqlx.Cursor.Open.OneOfMessage;
      reader.readMessage(value,proto.Mysqlx.Cursor.Open.OneOfMessage.deserializeBinaryFromReader);
      msg.setStmt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFetchRows(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Cursor.Open.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Cursor.Open.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Cursor.Open} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Open.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getStmt();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Mysqlx.Cursor.Open.OneOfMessage.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64(
      5,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Cursor.Open.OneOfMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Cursor.Open.OneOfMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Cursor.Open.OneOfMessage.displayName = 'proto.Mysqlx.Cursor.Open.OneOfMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Cursor.Open.OneOfMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Cursor.Open.OneOfMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getField(msg, 1),
    prepareExecute: (f = msg.getPrepareExecute()) && mysqlx_prepare_pb.Execute.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Cursor.Open.OneOfMessage}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Cursor.Open.OneOfMessage;
  return proto.Mysqlx.Cursor.Open.OneOfMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Cursor.Open.OneOfMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Cursor.Open.OneOfMessage}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.Mysqlx.Cursor.Open.OneOfMessage.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new mysqlx_prepare_pb.Execute;
      reader.readMessage(value,mysqlx_prepare_pb.Execute.deserializeBinaryFromReader);
      msg.setPrepareExecute(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Cursor.Open.OneOfMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Cursor.Open.OneOfMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.Mysqlx.Cursor.Open.OneOfMessage.Type} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getPrepareExecute();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mysqlx_prepare_pb.Execute.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.Type = {
  PREPARE_EXECUTE: 0
};

/**
 * required Type type = 1;
 * @return {!proto.Mysqlx.Cursor.Open.OneOfMessage.Type}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.getType = function() {
  return /** @type {!proto.Mysqlx.Cursor.Open.OneOfMessage.Type} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.Mysqlx.Cursor.Open.OneOfMessage.Type} value */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.setType = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.clearType = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.hasType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Mysqlx.Prepare.Execute prepare_execute = 2;
 * @return {?proto.Mysqlx.Prepare.Execute}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.getPrepareExecute = function() {
  return /** @type{?proto.Mysqlx.Prepare.Execute} */ (
    jspb.Message.getWrapperField(this, mysqlx_prepare_pb.Execute, 2));
};


/** @param {?proto.Mysqlx.Prepare.Execute|undefined} value */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.setPrepareExecute = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.clearPrepareExecute = function() {
  this.setPrepareExecute(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Open.OneOfMessage.prototype.hasPrepareExecute = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required uint32 cursor_id = 1;
 * @return {number}
 */
proto.Mysqlx.Cursor.Open.prototype.getCursorId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Mysqlx.Cursor.Open.prototype.setCursorId = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Mysqlx.Cursor.Open.prototype.clearCursorId = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Open.prototype.hasCursorId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required OneOfMessage stmt = 4;
 * @return {!proto.Mysqlx.Cursor.Open.OneOfMessage}
 */
proto.Mysqlx.Cursor.Open.prototype.getStmt = function() {
  return /** @type{!proto.Mysqlx.Cursor.Open.OneOfMessage} */ (
    jspb.Message.getWrapperField(this, proto.Mysqlx.Cursor.Open.OneOfMessage, 4, 1));
};


/** @param {!proto.Mysqlx.Cursor.Open.OneOfMessage} value */
proto.Mysqlx.Cursor.Open.prototype.setStmt = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.Mysqlx.Cursor.Open.prototype.clearStmt = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Open.prototype.hasStmt = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint64 fetch_rows = 5;
 * @return {number}
 */
proto.Mysqlx.Cursor.Open.prototype.getFetchRows = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.Mysqlx.Cursor.Open.prototype.setFetchRows = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.Mysqlx.Cursor.Open.prototype.clearFetchRows = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Open.prototype.hasFetchRows = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Cursor.Fetch = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Cursor.Fetch, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Cursor.Fetch.displayName = 'proto.Mysqlx.Cursor.Fetch';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Cursor.Fetch.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Cursor.Fetch.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Cursor.Fetch} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Fetch.toObject = function(includeInstance, msg) {
  var f, obj = {
    cursorId: jspb.Message.getField(msg, 1),
    fetchRows: jspb.Message.getField(msg, 5)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Cursor.Fetch}
 */
proto.Mysqlx.Cursor.Fetch.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Cursor.Fetch;
  return proto.Mysqlx.Cursor.Fetch.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Cursor.Fetch} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Cursor.Fetch}
 */
proto.Mysqlx.Cursor.Fetch.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCursorId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFetchRows(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Cursor.Fetch.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Cursor.Fetch.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Cursor.Fetch} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Fetch.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64(
      5,
      f
    );
  }
};


/**
 * required uint32 cursor_id = 1;
 * @return {number}
 */
proto.Mysqlx.Cursor.Fetch.prototype.getCursorId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Mysqlx.Cursor.Fetch.prototype.setCursorId = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Mysqlx.Cursor.Fetch.prototype.clearCursorId = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Fetch.prototype.hasCursorId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 fetch_rows = 5;
 * @return {number}
 */
proto.Mysqlx.Cursor.Fetch.prototype.getFetchRows = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.Mysqlx.Cursor.Fetch.prototype.setFetchRows = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.Mysqlx.Cursor.Fetch.prototype.clearFetchRows = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Fetch.prototype.hasFetchRows = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Cursor.Close = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Cursor.Close, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Cursor.Close.displayName = 'proto.Mysqlx.Cursor.Close';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Cursor.Close.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Cursor.Close.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Cursor.Close} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Close.toObject = function(includeInstance, msg) {
  var f, obj = {
    cursorId: jspb.Message.getField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Cursor.Close}
 */
proto.Mysqlx.Cursor.Close.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Cursor.Close;
  return proto.Mysqlx.Cursor.Close.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Cursor.Close} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Cursor.Close}
 */
proto.Mysqlx.Cursor.Close.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCursorId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Cursor.Close.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Cursor.Close.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Cursor.Close} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Cursor.Close.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * required uint32 cursor_id = 1;
 * @return {number}
 */
proto.Mysqlx.Cursor.Close.prototype.getCursorId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Mysqlx.Cursor.Close.prototype.setCursorId = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Mysqlx.Cursor.Close.prototype.clearCursorId = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Cursor.Close.prototype.hasCursorId = function() {
  return jspb.Message.getField(this, 1) != null;
};


goog.object.extend(exports, proto.Mysqlx.Cursor);
