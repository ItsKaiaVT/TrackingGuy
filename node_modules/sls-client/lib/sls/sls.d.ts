import * as $protobuf from 'protobufjs';
/** Namespace sls. */
export namespace sls {
  /** Properties of a Log. */
  //@ts-ignore
  interface ILog {
    /** Log Time */
    Time: number;

    /** Log Contents */
    Contents?: sls.Log.IContent[] | null;
  }

  /** Represents a Log. */
  class Log implements ILog {
    /**
     * Constructs a new Log.
     * @param [properties] Properties to set
     */
    constructor(properties?: sls.ILog);

    /** Log Time. */
    public Time: number;

    /** Log Contents. */
    public Contents: sls.Log.IContent[];

    /**
     * Creates a new Log instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Log instance
     */
    public static create(properties?: sls.ILog): sls.Log;

    /**
     * Encodes the specified Log message. Does not implicitly {@link sls.Log.verify|verify} messages.
     * @param message Log message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: sls.ILog,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Log message, length delimited. Does not implicitly {@link sls.Log.verify|verify} messages.
     * @param message Log message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: sls.ILog,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Log message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Log
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): sls.Log;

    /**
     * Decodes a Log message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Log
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): sls.Log;

    /**
     * Verifies a Log message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Log message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Log
     */
    public static fromObject(object: { [k: string]: any }): sls.Log;

    /**
     * Creates a plain object from a Log message. Also converts values to other types if specified.
     * @param message Log
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: sls.Log,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Log to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  namespace Log {
    /** Properties of a Content. */
    interface IContent {
      /** Content Key */
      Key: string;

      /** Content Value */
      Value: string;
    }

    /** Represents a Content. */
    class Content implements IContent {
      /**
       * Constructs a new Content.
       * @param [properties] Properties to set
       */
      constructor(properties?: sls.Log.IContent);

      /** Content Key. */
      public Key: string;

      /** Content Value. */
      public Value: string;

      /**
       * Creates a new Content instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Content instance
       */
      public static create(properties?: sls.Log.IContent): sls.Log.Content;

      /**
       * Encodes the specified Content message. Does not implicitly {@link sls.Log.Content.verify|verify} messages.
       * @param message Content message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: sls.Log.IContent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer;

      /**
       * Encodes the specified Content message, length delimited. Does not implicitly {@link sls.Log.Content.verify|verify} messages.
       * @param message Content message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: sls.Log.IContent,
        writer?: $protobuf.Writer
      ): $protobuf.Writer;

      /**
       * Decodes a Content message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns Content
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): sls.Log.Content;

      /**
       * Decodes a Content message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns Content
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): sls.Log.Content;

      /**
       * Verifies a Content message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a Content message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns Content
       */
      public static fromObject(object: { [k: string]: any }): sls.Log.Content;

      /**
       * Creates a plain object from a Content message. Also converts values to other types if specified.
       * @param message Content
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: sls.Log.Content,
        options?: $protobuf.IConversionOptions
      ): { [k: string]: any };

      /**
       * Converts this Content to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }
  }

  /** Properties of a LogTag. */
  interface ILogTag {
    /** LogTag Key */
    Key: string;

    /** LogTag Value */
    Value: string;
  }

  /** Represents a LogTag. */
  class LogTag implements ILogTag {
    /**
     * Constructs a new LogTag.
     * @param [properties] Properties to set
     */
    constructor(properties?: sls.ILogTag);

    /** LogTag Key. */
    public Key: string;

    /** LogTag Value. */
    public Value: string;

    /**
     * Creates a new LogTag instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LogTag instance
     */
    public static create(properties?: sls.ILogTag): sls.LogTag;

    /**
     * Encodes the specified LogTag message. Does not implicitly {@link sls.LogTag.verify|verify} messages.
     * @param message LogTag message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: sls.ILogTag,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified LogTag message, length delimited. Does not implicitly {@link sls.LogTag.verify|verify} messages.
     * @param message LogTag message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: sls.ILogTag,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a LogTag message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LogTag
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): sls.LogTag;

    /**
     * Decodes a LogTag message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LogTag
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): sls.LogTag;

    /**
     * Verifies a LogTag message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LogTag message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LogTag
     */
    public static fromObject(object: { [k: string]: any }): sls.LogTag;

    /**
     * Creates a plain object from a LogTag message. Also converts values to other types if specified.
     * @param message LogTag
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: sls.LogTag,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this LogTag to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a LogGroup. */
  interface ILogGroup {
    /** LogGroup Logs */
    Logs?: sls.ILog[] | null;

    /** LogGroup Reserved */
    Reserved?: string | null;

    /** LogGroup Topic */
    Topic?: string | null;

    /** LogGroup Source */
    Source?: string | null;

    /** LogGroup LogTags */
    LogTags?: sls.ILogTag[] | null;
  }

  /** Represents a LogGroup. */
  class LogGroup implements ILogGroup {
    /**
     * Constructs a new LogGroup.
     * @param [properties] Properties to set
     */
    constructor(properties?: sls.ILogGroup);

    /** LogGroup Logs. */
    public Logs: sls.ILog[];

    /** LogGroup Reserved. */
    public Reserved: string;

    /** LogGroup Topic. */
    public Topic: string;

    /** LogGroup Source. */
    public Source: string;

    /** LogGroup LogTags. */
    public LogTags: sls.ILogTag[];

    /**
     * Creates a new LogGroup instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LogGroup instance
     */
    public static create(properties?: sls.ILogGroup): sls.LogGroup;

    /**
     * Encodes the specified LogGroup message. Does not implicitly {@link sls.LogGroup.verify|verify} messages.
     * @param message LogGroup message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: sls.ILogGroup,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified LogGroup message, length delimited. Does not implicitly {@link sls.LogGroup.verify|verify} messages.
     * @param message LogGroup message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: sls.ILogGroup,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a LogGroup message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LogGroup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): sls.LogGroup;

    /**
     * Decodes a LogGroup message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LogGroup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): sls.LogGroup;

    /**
     * Verifies a LogGroup message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LogGroup message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LogGroup
     */
    public static fromObject(object: { [k: string]: any }): sls.LogGroup;

    /**
     * Creates a plain object from a LogGroup message. Also converts values to other types if specified.
     * @param message LogGroup
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: sls.LogGroup,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this LogGroup to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a LogGroupList. */
  interface ILogGroupList {
    /** LogGroupList logGroupList */
    logGroupList?: sls.ILogGroup[] | null;
  }

  /** Represents a LogGroupList. */
  class LogGroupList implements ILogGroupList {
    /**
     * Constructs a new LogGroupList.
     * @param [properties] Properties to set
     */
    constructor(properties?: sls.ILogGroupList);

    /** LogGroupList logGroupList. */
    public logGroupList: sls.ILogGroup[];

    /**
     * Creates a new LogGroupList instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LogGroupList instance
     */
    public static create(properties?: sls.ILogGroupList): sls.LogGroupList;

    /**
     * Encodes the specified LogGroupList message. Does not implicitly {@link sls.LogGroupList.verify|verify} messages.
     * @param message LogGroupList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: sls.ILogGroupList,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified LogGroupList message, length delimited. Does not implicitly {@link sls.LogGroupList.verify|verify} messages.
     * @param message LogGroupList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: sls.ILogGroupList,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a LogGroupList message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LogGroupList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): sls.LogGroupList;

    /**
     * Decodes a LogGroupList message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LogGroupList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): sls.LogGroupList;

    /**
     * Verifies a LogGroupList message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LogGroupList message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LogGroupList
     */
    public static fromObject(object: { [k: string]: any }): sls.LogGroupList;

    /**
     * Creates a plain object from a LogGroupList message. Also converts values to other types if specified.
     * @param message LogGroupList
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: sls.LogGroupList,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this LogGroupList to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}
